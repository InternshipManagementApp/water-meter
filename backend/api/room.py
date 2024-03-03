from fastapi import Depends, APIRouter, HTTPException
from models.model import  Room
from models.schema import RoomSchema
from sqlalchemy.orm import Session
from database import getDb

router = APIRouter()

@router.get("/")
def getAllRooms(db: Session = Depends(getDb)):
    rooms = db.query(Room).all()
    return rooms
    
@router.post("/")
def addNewRoom(room: RoomSchema, db: Session = Depends(getDb)):
    db_room = Room(**room.dict()) #unpacking the dictionary object to change into Room object
    db.add(db_room)
    db.commit()
    db.refresh(db_room)
    return db_room

@router.get("/{id}")
def getRoomById(id: int, db: Session = Depends(getDb)):
    room = db.query(Room).filter(Room.id == id).first()
    if room is None:
        raise HTTPException(status_code=404, detail="Room not found")
    return room
    
@router.get("/byNumber/")
def getRoomByNumber(roomNumber: int, db: Session = Depends(getDb)):
    room = db.query(Room).filter(Room.roomNumber == roomNumber).first()
    if room is None:
        raise HTTPException(status_code=404, detail="Room not found")
    return room