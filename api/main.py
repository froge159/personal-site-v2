from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from fastapi.security import APIKeyHeader
import os
import routes

app = FastAPI(
    title = "Blog API",
    description = "simple blog API for my personal site",
    version = "0.1.0",
    )

app.include_router(routes.router)

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:8000",
    "https://froge159.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)


@app.get("/")
async def root():
    return {"message": "Welcome to the blog API"}


if __name__ == "__main__":
    print("Starting uvicorn server")
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port = 8000,
        reload = True
    )