# Backend/Python/Dockerfile

# 1. Start with a lightweight Python image
FROM python:3.11-slim

# 2. Set working directory
WORKDIR /app

# 3. Install system dependencies for Postgres (required for psycopg2)
RUN apt-get update && apt-get install -y libpq-dev gcc

# 4. Copy requirements and install them
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# RUN pip uninstall -y google-generativeai google-ai-generativelanguage || true

# 5. Copy the rest of the application code
COPY . .

# 6. Expose the port FastAPI runs on
EXPOSE 8000

# 7. Command to run the app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]