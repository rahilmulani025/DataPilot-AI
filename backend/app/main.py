from fastapi import FastAPI, UploadFile, File
import shutil
import os
import uuid

from app.services.profiler import profile_dataset
from app.services.quality import analyze_quality
from app.services.eda import analyze_eda
from app.services.insights import generate_insights
from app.services.cleaning import generate_cleaning_plan, apply_cleaning


app = FastAPI(
    title="DataPilot AI Backend",
    description="Autonomous Data Science Platform",
    version="1.0.0"
)


RAW_DATA_DIR = "../data/raw"
CLEANED_DATA_DIR = "../data/cleaned"

PROJECT_FILES = {}

os.makedirs(RAW_DATA_DIR, exist_ok=True)
os.makedirs(CLEANED_DATA_DIR, exist_ok=True)


@app.get("/health")
def health():
    return {
        "status": "ok",
        "message": "DataPilot AI backend is running"
    }


@app.post("/projects")
def create_project(name: str = "New Project"):

    project_id = str(uuid.uuid4())

    return {
        "status": "success",
        "project_id": project_id,
        "name": name,
        "message": "Project created successfully"
    }


@app.post("/projects/{project_id}/upload")
async def upload_file(
    project_id: str,
    file: UploadFile = File(...)
):

    file_path = os.path.join(
        RAW_DATA_DIR,
        f"{project_id}_{file.filename}"
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    PROJECT_FILES[project_id] = file_path

    profile = profile_dataset(file_path)
    quality = analyze_quality(file_path)
    eda = analyze_eda(file_path)
    insights = generate_insights(file_path)

    return {
        "status": "success",
        "project_id": project_id,
        "filename": file.filename,
        "file_path": file_path,
        "dataset_profile": profile,
        "data_quality": quality,
        "eda": eda,
        "insights": insights
    }


@app.get("/projects/{project_id}/cleaning-plan")
def get_cleaning_plan(project_id: str):

    file_path = PROJECT_FILES.get(project_id)

    if not file_path:
        return {
            "status": "error",
            "message": "Project dataset not found"
        }

    plan = generate_cleaning_plan(file_path)

    return {
        "status": "success",
        "project_id": project_id,
        "cleaning_plan": plan
    }


@app.post("/projects/{project_id}/cleaning-plan/approve")
def approve_cleaning_plan(project_id: str):

    file_path = PROJECT_FILES.get(project_id)

    if not file_path:
        return {
            "status": "error",
            "message": "Project dataset not found"
        }

    filename = os.path.basename(file_path)

    cleaned_filename = f"cleaned_{filename}"

    cleaned_path = os.path.join(
        CLEANED_DATA_DIR,
        cleaned_filename
    )

    result = apply_cleaning(
        file_path,
        cleaned_path
    )

    return {
        "status": "approved",
        "project_id": project_id,
        "message": "Cleaning plan approved and cleaning applied",
        "cleaning_result": result
    }