from pydantic import BaseModel
from fastapi import UploadFile

class RoomSchema(BaseModel):
    roomNumber: int
    
class MonthRoomSchema(BaseModel):
    roomNumber: int
    monthName: str
    meterNumber: str
    date: str
    
class InitialDataSchema(BaseModel):
    roomNumber: int
    monthName: str
    date: str
    file: UploadFile