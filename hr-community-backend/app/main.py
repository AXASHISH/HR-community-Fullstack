from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.api import api_router
from app.core.config import settings

# 👇 ADD THESE IMPORTS
from app.db.session import engine, Base

# 👇 IMPORTANT: import all models so they register
from app.models import *

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"/api/v1/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")
# app.include_router(api_router, prefix="")

# 🚀 CREATE TABLES HERE
@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "Welcome to HR Community API", "docs": "/docs"}

#FOR DEBUGGING PURPOSES ONLY - TO CHECK IF TABLES ARE CREATED
# @app.get("/debug-tables")
# def debug_tables():
#     return {"tables": list(Base.metadata.tables.keys())}

        