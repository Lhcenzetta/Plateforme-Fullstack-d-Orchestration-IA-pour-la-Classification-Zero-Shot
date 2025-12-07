from db.base import Base
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String)
    fullname = Column(String)
    email = Column(String)
    passwordhash = Column(String)
    createdat = Column(String)
    
    history = relationship("History", back_populates="user")


class History(Base):
    __tablename__ = "history"

    id = Column(Integer, primary_key=True, autoincrement=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    text = Column(String)
    predict_categorie = Column(String)
    confidence = Column(Float)
    resume = Column(String)
    tone = Column(String)

    
    user = relationship("User", back_populates="history")
