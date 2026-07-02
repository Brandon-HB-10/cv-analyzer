from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from database import Base

class Analisis(Base):
    __tablename__ = "analisis"

    id = Column(Integer, primary_key=True, index=True)
    cv_texto = Column(Text, nullable=False)
    resultado = Column(Text, nullable=False)
    fecha = Column(DateTime, server_default=func.now())