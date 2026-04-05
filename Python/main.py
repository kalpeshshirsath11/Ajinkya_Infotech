from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from rag_service import ingest_text, answer_question
from fastapi.middleware.cors import CORSMiddleware
import traceback

# Load secrets
load_dotenv()

app = FastAPI()

# ✅ FIXED CORS
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://ajinkya-infotech.vercel.app"  # ❌ removed trailing /
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,   # ✅ FIXED
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- MODELS ----------

class IngestRequest(BaseModel):
    text: str
    source_id: str

class ChatRequest(BaseModel):
    question: str


# ---------- HEALTH ----------

#  FIXED (GET + HEAD)
@app.api_route("/health", methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"])
def health():
    return {"status": "AI Service is running"}

#  Recommended separate health endpoint
@app.api_route("/health", methods=["GET", "HEAD"])
def health():
    return {"status": "OK"}


# ---------- ROUTES ----------

@app.post("/ingest")
def ingest_endpoint(request: IngestRequest):
    try:
        ingest_text(request.text, request.source_id)
        return {"status": "success"}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Internal Server Error")


@app.post("/chat")
def chat_endpoint(request: ChatRequest):
    try:
        print("API HIT")  # debug
        answer = answer_question(request.question)
        return {"answer": answer}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Internal Server Error")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)