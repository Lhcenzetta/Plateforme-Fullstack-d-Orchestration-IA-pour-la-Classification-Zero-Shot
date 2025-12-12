from db.base import engine , Base ,get_db
from sqlalchemy.orm import Session
from fastapi import FastAPI,Depends
from models .user import User ,History
from api import auth
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind = engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router)
# @app.get("/test")
# def home():
#     return "hello"