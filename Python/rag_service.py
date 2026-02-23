# This file handles the "Brain" work: talking to Gemini and searching the database.

import os
import time
import psycopg
from dotenv import load_dotenv
from google import genai
from google.genai import types
# Load environment variables first
load_dotenv()


from langchain_postgres import PGVector
from langchain_core.documents import Document
from langchain_core.embeddings import Embeddings
# 1. Setup Gemini Client
# We use 'gemini-embedding-001' for vectors (768 dims via output_dimensionality)
# We use 'gemini-2.5-flash-lite' for chat (fast & has free tier quota)

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY"),
)


# 2. Connect to the Vector DB
# This string must match your .env credentials
connection = f"postgresql+psycopg://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"

class GeminiEmbeddings(Embeddings):
    def embed_documents(self, texts):
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
        response = client.models.embed_content(
            model="gemini-embedding-001",
            contents=text,
            config=types.EmbedContentConfig(output_dimensionality=768),
        )
        return response.embeddings[0].values

# ---------- EMBEDDING FUNCTION ----------

# def embed_text(text: str):
#     response = client.models.embed_content(
#         model="text-embedding-004",
#         contents=text,
#     )
#     return response.embeddings[0].values


# ---------- VECTOR STORE ----------

def get_vector_store():
    return PGVector(
        embeddings=GeminiEmbeddings(),   # <-- IMPORTANT
        collection_name="vector_store",
        connection=connection,
        embedding_length=768,
        use_jsonb=True,
    )



# ---------- INGEST TEXT ----------

def _delete_by_source_id(source_id: str):
    """Remove old embeddings for a source before re-ingesting."""
    raw_conn = connection.replace("postgresql+psycopg://", "postgresql://")
    try:
        with psycopg.connect(raw_conn) as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "DELETE FROM langchain_pg_embedding WHERE cmetadata->>'source_id' = %s",
                    (source_id,)
                )
                deleted = cur.rowcount
                conn.commit()
                if deleted > 0:
                    print(f"🗑️ Deleted {deleted} old doc(s) for {source_id}")
    except Exception as e:
        print(f"⚠️ Could not delete old docs for {source_id}: {e}")


def ingest_text(text: str, source_id: str):
    _delete_by_source_id(source_id)

    store = get_vector_store()

    doc = Document(
        page_content=text,
        metadata={"source_id": source_id}
    )

    store.add_documents([doc])

    print(f"✅ Indexed document: {source_id}")



def answer_question(question: str):
    store = get_vector_store()

    docs = store.similarity_search(question, k=5)

    context = "\n\n---\n\n".join([d.page_content for d in docs])

    if not context.strip():
        return "I couldn't find any relevant information."

    prompt = f"""
You are a friendly and helpful AI assistant for the Ajinkya Infotech website.
Your job is to answer user questions based on the website's content provided below.

Instructions:
- Use ALL the context provided below to give a thorough, informative answer.
- Combine information from multiple pieces of context when relevant.
- Include specific details like course names, durations, prices, module names, and blog topics.
- If the user asks a broad question (e.g. "tell me about this website"), summarize everything you know from the context.
- Only say you don't know if the context truly has no relevant information at all.
- Be conversational and helpful.

Website Content:
{context}

User Question: {question}
"""

    for attempt in range(3):
        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash-lite",
                contents=prompt,
            )
            return response.text
        except Exception as e:
            if "429" in str(e) and attempt < 2:
                wait = (attempt + 1) * 15
                print(f"⏳ Rate limited, retrying in {wait}s (attempt {attempt + 1}/3)")
                time.sleep(wait)
            else:
                raise e
