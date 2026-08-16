from fastapi import APIRouter, HTTPException

from app.schemas.project import ProjectCreate
from app.services.project_service import (
    create_project,
    get_projects,
    get_project,
    delete_project,
)

router = APIRouter(
    prefix="/projects",
    tags=["Projects"],
)


@router.post("")
def create_new_project(data: ProjectCreate):
    return create_project(data.name)


@router.get("")
def list_all_projects():
    return get_projects()


@router.get("/{project_id}")
def get_single_project(project_id: str):
    project = get_project(project_id)

    if project is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    return project


@router.delete("/{project_id}")
def remove_project(project_id: str):
    project = get_project(project_id)

    if project is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    delete_project(project_id)

    return {
        "status": "success",
        "message": "Project deleted successfully",
        "project_id": project_id,
    }