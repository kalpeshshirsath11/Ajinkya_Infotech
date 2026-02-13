# This file handles the "Brain" work: talking to Gemini and searching the database.

import os
from dotenv import load_dotenv

# Load environment variables first
load_dotenv()

from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_postgres import PGVector
from langchain_core.documents import Document

# 1. Setup Gemini Models
# We use 'text-embedding-004' for vectors (768 dims)
# We use 'gemini-1.5-flash' for chat (fast & cheap)
embeddings = GoogleGenerativeAIEmbeddings(
    model="models/text-embedding-004",
    google_api_key=os.getenv("GEMINI_API_KEY")
)

llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash",
    google_api_key=os.getenv("GEMINI_API_KEY")
)

# 2. Connect to the Vector DB
# This string must match your .env credentials
connection = f"postgresql+psycopg2://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"

vector_store = PGVector(
    embeddings=embeddings,
    collection_name="vector_store",
    connection=connection,
    use_jsonb=True,
)

def ingest_text(text: str, source_id: str):
    """
    Takes raw text (e.g., a Blog post), chunks it, and saves to DB.
    """
    # Simple logic: If text is huge, you might want to split it further.
    # For now, we treat the whole block as one document (good for short blogs).
    doc = Document(page_content=text, metadata={"source_id": source_id})
    
    # This automatically computes the vector and inserts into Postgres
    vector_store.add_documents([doc])
    print(f"✅ Indexed document: {source_id}")

def answer_question(question: str):
    """
    1. Turn question into vector.
    2. Search DB for similar text.
    3. Send text + question to Gemini.
    """
    # Search for top 3 most relevant snippets
    docs = vector_store.similarity_search(question, k=3)
    
    # Combine the found text into one big string context
    context = "\n\n".join([d.page_content for d in docs])
    
    if not context:
        return "I couldn't find any relevant information on the website."

    # Create the prompt for Gemini
    template = """
    You are a helpful assistant for a specific website. 
    Answer the user's question based ONLY on the context provided below. 
    If the answer is not in the context, say "I don't have that information."
    
    Context from website:
    {context}
    
    User Question: {question}
    """
    
    prompt = ChatPromptTemplate.from_template(template)
    chain = prompt | llm
    
    # Run the chain
    response = chain.invoke({"context": context, "question": question})
    return response.content
