# app/main.py
from fastapi import FastAPI
from app.routers.api import router as api_router

app = FastAPI()

# Attach your API router
app.include_router(api_router, prefix="/")
