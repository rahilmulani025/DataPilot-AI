from fastapi import APIRouter, HTTPException

from app.schemas.project import ProjectCreate
from app.services.project_service import (
    create_project,
    get_projects,
    get_project,
    delete_project
)

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)

@router.post("/")
def create_new_project(data: ProjectCreate):
    return create_project(data.name)

@router.get("/")
def list_projects():
    return get_projects()

@router.get("/{project_id}")
def get_single_project(project_id: str):
    project = get_project(project_id)

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    return project

@router.delete("/{project_id}")
def remove_project(project_id: str):
    delete_project(project_id)

    return {"message": "Project deleted"}