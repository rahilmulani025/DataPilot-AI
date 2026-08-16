import json
import uuid
from datetime import datetime
from pathlib import Path

PROJECTS_FILE = Path("backend/data/projects.json")

def load_projects():
    if not PROJECTS_FILE.exists():
        return []

    with open(PROJECTS_FILE, "r") as f:
        return json.load(f)

def save_projects(projects):
    with open(PROJECTS_FILE, "w") as f:
        json.dump(projects, f, indent=2)

def create_project(name: str):
    projects = load_projects()

    project = {
        "id": str(uuid.uuid4()),
        "name": name,
        "created_at": datetime.now().isoformat(),
        "status": "created"
    }

    projects.append(project)

    save_projects(projects)

    return project

def get_projects():
    return load_projects()

def get_project(project_id: str):
    projects = load_projects()

    for project in projects:
        if project["id"] == project_id:
            return project

    return None

def delete_project(project_id: str):
    projects = load_projects()

    projects = [
        p
        for p in projects
        if p["id"] != project_id
    ]

    save_projects(projects)