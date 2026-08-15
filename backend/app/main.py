from fastapi import FastAPI, UploadFile, File
import shutil
import os
from app.services.profiler import profile_dataset

app = FastAPI()


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join("../data", file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "filename": file.filename,
        "message": "File uploaded successfully"
    }


@app.get("/profile")
def profile():
    file_path = "../data/test_data.csv"

    return profile_dataset(file_path)