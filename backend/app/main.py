from db.base import engine , Base ,get_db
from sqlalchemy.orm import Session
from fastapi import FastAPI,Depends
from models .user import User ,History
from api import auth

Base.metadata.create_all(bind = engine)

app = FastAPI()

app.include_router(auth.router)