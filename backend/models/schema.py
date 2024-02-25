from pydantic import BaseModel
from fastapi import UploadFile
from typing import Optional

class RoomSchema(BaseModel):
    roomNumber: int
    
class MonthRoomSchema(BaseModel):
    roomNumber: int
    monthName: str
    meterNumber: str
    date: str

class UserSchema(BaseModel):
    userName : Optional[str] = None
    personType : Optional[str] = None
    email : Optional[str] = None
    password : Optional[str] = None
    telephone : Optional[str] = None