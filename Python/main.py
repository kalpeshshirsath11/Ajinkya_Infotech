# main.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import os
import logging

# Import your RAG functions
from rag_service import ingest_text, answer_question

# Load environment variables
load_dotenv()

# Logging setup
logging.basicConfig(level=logging.INFO)

# Initialize FastAPI app
app = FastAPI(title="AI Chatbot Service 🚀")

# CORS configuration
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://ajinkya-infotech.vercel.app",
    "https://ajinkya-infotech-1.onrender.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
#  Request Models
# -------------------------------

class IngestRequest(BaseModel):
    text: str
    source_id: str  # Example: "course_java", "blog_101"


class ChatRequest(BaseModel):
    question: str




@app.get("/")
async def health_check():
    return {"status": "AI Service is running "}


@app.get("/health")
async def health():
    return {"status": "ok"}



@app.post("/ingest")
async def ingest_endpoint(request: IngestRequest):
    try:
        logging.info(f"Ingesting data for source: {request.source_id}")

        ingest_text(request.text, request.source_id)

        return {
            "status": "success",
            "message": "Content indexed successfully"
        }

    except Exception as e:
        logging.error(f"Ingest Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# -------------------------------
# 💬 Chat Endpoint
# -------------------------------

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        logging.info(f"Received question: {request.question}")

        answer = answer_question(request.question)

        return {
            "answer": answer
        }

    except Exception as e:
        logging.error(f"Chat Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# -------------------------------
#  Run Server (Render Compatible)
# -------------------------------

if __name__ == "__main__":
    import uvicorn

    port = int(os.environ.get("PORT", 8000))

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=False
    )