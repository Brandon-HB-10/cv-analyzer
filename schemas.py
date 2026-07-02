from pydantic import BaseModel
from datetime import datetime

class AnalisisCreate(BaseModel):
    cv_texto: str

class AnalisisResponse(BaseModel):
    id: int
    cv_texto: str
    resultado: str
    fecha: datetime

    class Config:
        from_attributes = True