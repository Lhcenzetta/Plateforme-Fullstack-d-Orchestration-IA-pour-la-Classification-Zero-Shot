
from pydantic import BaseModel
from datetime import  datetime

class UserCreat(BaseModel):
    username : str
    fullname : str
    email : str
    passwordhash : str
class UserRead(BaseModel):
    username : str
    passwordhash : str
class HistoryCreat(BaseModel):
    user_id: int
    text: str
    class config:
        orm_mode = True