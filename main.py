from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, get_db
import models, schemas
from ia import analizar_cv

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Esto permite que React se conecte al backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Analizar CV y guardarlo
@app.post("/analizar", response_model=schemas.AnalisisResponse)
def analizar(datos: schemas.AnalisisCreate, db: Session = Depends(get_db)):
    resultado = analizar_cv(datos.cv_texto)
    nuevo_analisis = models.Analisis(
        cv_texto=datos.cv_texto,
        resultado=resultado
    )
    db.add(nuevo_analisis)
    db.commit()
    db.refresh(nuevo_analisis)
    return nuevo_analisis

# Obtener historial de análisis
@app.get("/historial", response_model=list[schemas.AnalisisResponse])
def historial(db: Session = Depends(get_db)):
    return db.query(models.Analisis).all()