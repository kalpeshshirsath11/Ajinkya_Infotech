# This is the file that listens for requests from your Spring Boot app. It then uses LangChain to talk to Gemini and Postgres.
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from rag_service import ingest_text, answer_question
from fastapi.middleware.cors import CORSMiddleware
# Load secrets
load_dotenv()

app = FastAPI()
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://ajinkya-infotech.vercel.app/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data Models (defines what JSON we expect) ---
class IngestRequest(BaseModel):
    text: str
    source_id: str  # e.g., "blog_101" or "course_java"

class ChatRequest(BaseModel):
    question: str

# --- Endpoints ---

@app.get("/")
def health_check():
    return {"status": "AI Service is running"}

@app.post("/ingest")
def ingest_endpoint(request: IngestRequest):
    try:
        ingest_text(request.text, request.source_id)
        return {"status": "success", "message": "Content indexed."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat")
def chat_endpoint(request: ChatRequest):
    try:
        answer = answer_question(request.question)
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # Run on port 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)
