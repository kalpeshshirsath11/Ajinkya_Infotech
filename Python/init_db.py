# We need a script to create the vector_store table in your database. 
# This is the table that will hold the "embeddings" (number versions of your text).


import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

def init_db():
    try:
        # Connect to your Docker Database
        conn = psycopg2.connect(
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT"),
            dbname=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD")
        )
        cur = conn.cursor()
        print(" Connected to Database!")

        # 1. Ensure Vector Extension is ON
        cur.execute("CREATE EXTENSION IF NOT EXISTS vector;")
        
        # 2. Create the Table
        # 'embedding vector(1536)' matches OpenAI's model size.
       # Gemini embeddings = 768 dimensions
        cur.execute("""
            CREATE TABLE IF NOT EXISTS vector_store (
                id BIGSERIAL PRIMARY KEY,
                content TEXT,
                metadata JSONB,
                embedding vector(768)
            );
        """)

        print(" Table 'vector_store' created.")

        # 3. Create Search Index (IVFFlat) for speed
        cur.execute("""
            CREATE INDEX IF NOT EXISTS vector_index 
            ON vector_store 
            USING ivfflat (embedding vector_cosine_ops)
            WITH (lists = 100);
        """)
        print(" Index created.")

        conn.commit()
        cur.close()
        conn.close()
        print(" Setup Complete!")

    except Exception as e:
        print(f" Error: {e}")

if __name__ == "__main__":
    init_db()
