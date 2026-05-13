from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers import shopping

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Familienplaner API",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "service": "familienplaner-backend",
        "version": "0.1.0"
    }


app.include_router(
    shopping.router,
    prefix="/api/shopping",
    tags=["shopping"]
)
