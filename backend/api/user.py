from fastapi import Depends, APIRouter, HTTPException
from models.model import  User
from models.schema import UserSchema
from sqlalchemy.orm import Session
from database import getDb
import base64 

router = APIRouter()

@router.get("/")
def getAllUsers(db: Session = Depends(getDb)):
    users = db.query(User).all()
    return users
    
@router.post("/")
def addNewUser(user: UserSchema, db: Session = Depends(getDb)):
    user.password = base64.b64encode(user.password.encode("utf-8"))
    db_user = User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/{id}")
def getUserById(userId: int, db: Session = Depends(getDb)):
    user = db.query(User).filter(User.id == userId).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
    
@router.get("/{email}/{password}")
def getUserByEmailAndPassword(email:str, password:str, db: Session = Depends(getDb)):
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise HTTPException(status_code=404, detail="The email is incorrect")
    if base64.b64decode(user.password).decode("utf-8") != password:
        raise HTTPException(status_code=404, detail="The password is incorrect")
    return user
    
@router.put("/{userId}")
def updateUser(userId: int, newUser: UserSchema, db: Session = Depends(getDb)):
    user = db.query(User).filter(User.id == userId).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    if newUser.userName is not None:
        user.userName = newUser.userName
    if newUser.personType is not None:
        user.personType = newUser.personType
    if newUser.email is not None:
        user.email = newUser.email
    if newUser.password is not None:
        user.password = newUser.password
    if newUser.telephone is not None:
        user.telephone = newUser.telephone
    db.commit()
    user = db.query(User).filter(User.id == userId).first()
    return user
    
@router.delete("/")
def deleteUser(userId: int,  db: Session = Depends(getDb)):
    user = db.query(User).filter(User.id == userId).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return "Success deleted user with id: " + str(userId)
    