# This file handles the "Brain" work: talking to Groq LLM and searching the database.
# Gemini is still used for embeddings (Groq has no embedding API).

import os
import time
import psycopg
from dotenv import load_dotenv
from google import genai
from google.genai import types
from groq import Groq

# Load .env ONLY for local development
load_dotenv()

# ---------- ENV VALIDATION ----------

def get_env_variable(name: str) -> str:
    value = os.environ.get(name)
    if not value:
        raise ValueError(f"❌ Missing environment variable: {name}")
    return value


# ---------- GEMINI CLIENT (embeddings only) ----------

def get_gemini_client():
    api_key = get_env_variable("GEMINI_API_KEY")
    return genai.Client(api_key=api_key)


# ---------- GROQ CLIENT (LLM generation) ----------

def get_groq_client():
    api_key = get_env_variable("GROQ_API_KEY")
    return Groq(api_key=api_key)


# ---------- DATABASE CONNECTION ----------

def get_connection_string():
    return (
        f"postgresql+psycopg://"
        f"{get_env_variable('DB_USER')}:"
        f"{get_env_variable('DB_PASSWORD')}@"
        f"{get_env_variable('DB_HOST')}:"
        f"{get_env_variable('DB_PORT')}/"
        f"{get_env_variable('DB_NAME')}"
    )


# ---------- LANGCHAIN IMPORTS ----------
from langchain_postgres import PGVector
from langchain_core.documents import Document
from langchain_core.embeddings import Embeddings


# ---------- EMBEDDINGS ----------

class GeminiEmbeddings(Embeddings):
    def embed_documents(self, texts):
        client = get_gemini_client()
        vectors = []

        for text in texts:
            response = client.models.embed_content(
                model="gemini-embedding-001",
                contents=text,
                config=types.EmbedContentConfig(output_dimensionality=768),
            )
            vectors.append(response.embeddings[0].values)

        return vectors

    def embed_query(self, text):
        client = get_gemini_client()

        response = client.models.embed_content(
            model="gemini-embedding-001",
            contents=text,
            config=types.EmbedContentConfig(output_dimensionality=768),
        )

        return response.embeddings[0].values


# ---------- VECTOR STORE ----------

def get_vector_store():
    return PGVector(
        embeddings=GeminiEmbeddings(),
        collection_name="vector_store",
        connection=get_connection_string(),
        embedding_length=768,
        use_jsonb=True,
    )


# ---------- DELETE OLD DOCS ----------

def _delete_by_source_id(source_id: str):
    raw_conn = get_connection_string().replace("postgresql+psycopg://", "postgresql://")

    try:
        with psycopg.connect(raw_conn) as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "DELETE FROM langchain_pg_embedding WHERE cmetadata->>'source_id' = %s",
                    (source_id,),
                )
                deleted = cur.rowcount
                conn.commit()

                if deleted > 0:
                    print(f"🗑️ Deleted {deleted} old doc(s) for {source_id}")

    except Exception as e:
        print(f"⚠️ Could not delete old docs for {source_id}: {e}")


# ---------- INGEST ----------

def ingest_text(text: str, source_id: str):
    _delete_by_source_id(source_id)

    store = get_vector_store()

    doc = Document(
        page_content=text,
        metadata={"source_id": source_id},
    )

    store.add_documents([doc])

    print(f"✅ Indexed document: {source_id}")


# ---------- LANGUAGE DETECTION ----------

def _detect_language(question: str) -> str:
    client = get_groq_client()

    detection_prompt = (
        "Detect the language of the following text. "
        "If Romanized Hindi → reply 'Hindi'. "
        "If Romanized Marathi → reply 'Marathi'. "
        "Reply ONLY with language name.\n\n"
        f"Text: {question}"
    )

    try:
        resp = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": detection_prompt}],
            max_tokens=10,
        )
        detected = resp.choices[0].message.content.strip()
        print(f"🌐 Detected language: {detected}")
        return detected

    except Exception as e:
        print(f"⚠️ Language detection failed: {e}")
        return "English"


# ---------- CHAT ----------

def answer_question(question: str):
    store = get_vector_store()
    client = get_groq_client()

    docs = store.similarity_search(question, k=5)

    context = "\n\n---\n\n".join([d.page_content for d in docs])

    if not context.strip():
        return "I couldn't find any relevant information."

    detected_language = _detect_language(question)

    system_instruction = (
        f"You are a helpful AI assistant. "
        f"You MUST reply ONLY in {detected_language}. "
        f"Response must be 1–100 words (ideal ~50)."
    )

    prompt = f"""
Answer using ONLY the content below.

Content:
{context}

Question: {question}

⚠️ Reply ONLY in {detected_language}
⚠️ Max 100 words
"""

    for attempt in range(3):
        try:
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[
                    {"role": "system", "content": system_instruction},
                    {"role": "user", "content": prompt},
                ],
                max_tokens=300,
            )

            return response.choices[0].message.content

        except Exception as e:
            if "429" in str(e) and attempt < 2:
                wait = (attempt + 1) * 15
                print(f"⏳ Retry in {wait}s...")
                time.sleep(wait)
            else:
                raise e