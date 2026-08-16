from fastapi import APIRouter
import uuid

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)


@router.post("")
def create_project(name: str = "New Project"):
    project_id = str(uuid.uuid4())

    return {
        "status": "success",
        "project_id": project_id,
        "name": name,
        "message": "Project created successfully"
    }