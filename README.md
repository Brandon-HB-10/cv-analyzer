# CV Analyzer 🤖

Aplicación fullstack que analiza CVs usando Inteligencia Artificial.

## 🔗 Demo en vivo
[cv-analyzer-omega-drab.vercel.app](https://cv-analyzer-omega-drab.vercel.app)

## ¿Qué hace?
- El usuario pega el texto de su CV
- La IA lo analiza y regresa:
  - Puntos fuertes
  - Áreas de mejora
  - Puestos recomendados
  - Sugerencias concretas
- Los análisis se guardan en una base de datos

## 🛠️ Tecnologías
**Frontend:**
- React
- Tailwind CSS

**Backend:**
- FastAPI
- PostgreSQL
- SQLAlchemy

**IA:**
- Groq API (LLaMA 3.3 70B)

## 📁 Estructura
cv-analyzer/
├── frontend/     → React + Tailwind
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   └── ia.py

## ⚙️ Cómo correrlo
1. Clona el repositorio
2. Configura tu `.env` con las keys
3. Corre el backend: `uvicorn main:app --reload`
4. Corre el frontend: `npm run dev`