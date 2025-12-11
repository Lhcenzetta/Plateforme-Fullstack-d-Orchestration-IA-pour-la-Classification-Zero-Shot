from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from db.base import get_db
from services.hybrid_analyse import hybrid_analyse
import os
from jose import jwt, JWTError
from fastapi import FastAPI, APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models.user import User, History
from passlib.context import CryptContext
from schemas import authschemas
from datetime import datetime, timedelta

bearer_scheme = HTTPBearer()
router = APIRouter(
    prefix="/autho",
)
# pwd_context = CryptContext(schemes=["bcrypt"])
SECRET_KEY = os.environ.get("SECRET_KEY", "CHANGE_ME_IN_PRODUCTION")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def decode_token(token: str):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        return None


def verify_token(cred: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    token = cred.credentials
    decoded = decode_token(token)
    if decoded is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )
    return decoded


@router.post("/signup", response_model=authschemas.UserCreat)
def sign_up(user: authschemas.UserCreat, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists.")
    
    # hashed_password = pwd_context.hash(user.passwordhash)

    new_user = User(
        username=user.username,
        fullname=user.fullname,
        email=user.email,
        # passwordhash=hashed_password,
        passwordhash=user.passwordhash,
        createdat=datetime.utcnow()
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.post("/singin")
def sign_in(user:authschemas.UserRead , db : Session = Depends(get_db)):
    user_check = db.query(User).filter(User.username == user.username).first()
    if not user_check:
        raise HTTPException(status_code=404, detail="User does not exist.")
    # if not pwd_context.verify(User.passwordhash, user.passwordhash):
    #     raise HTTPException(status_code=401, detail="Incorrect password.")
    if user_check.passwordhash != user.passwordhash:
        raise HTTPException(status_code=401, detail="Incorrect password.")
    payload = {"username": user.username}
    access_token = create_access_token(payload)

    return {"access_token": access_token, "token_type": "bearer" ,"user_id" : user_check.id}

@router.post("/geminia")
def analyser_test(content: authschemas.HistoryCreat, db: Session = Depends(get_db), dict = Depends(verify_token)):

    text, confidence, categorie, resume, tone = hybrid_analyse(content.text)

    params = History(
        user_id = content.user_id,
        text= text,
        predict_categorie=categorie,
        confidence=confidence,
        resume=resume,
        tone=tone
    )

    db.add(params)
    db.commit()
    db.refresh(params)

    return {
        "text": text,
        "confidence": confidence,
        "categorie": categorie,
        "resume": resume,
        "tone": tone,
        "history_id": params.id
    }


@router.get("/get_db")
def get_db(db : Session = Depends(get_db)):
    return db.query(User).all()
