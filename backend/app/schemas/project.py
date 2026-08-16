from pydantic import BaseModel
from datetime import datetime

class ProjectCreate(BaseModel):
    name: str

class ProjectResponse(BaseModel):
    id: str
    name: str
    created_at: datetime
    status: str