from fastapi import  FastAPI, HTTPException
from api.room import router as room_router
from api.month import router as month_router
from api.watermeter import router as watermeter_router
from api.month import initializeTable
from models.model import Base, Month
from database import engine, getDb
from sqlalchemy import event

#initialization for the Month table
event.listen(Month.__table__, 'after_create', initializeTable) 

api = FastAPI()

@api.on_event("startup") #create the database
def configure():
    Base.metadata.create_all(bind=engine)
    
api.include_router(room_router, prefix="/room", tags=["room"])
api.include_router(month_router, prefix="/month", tags=["month"])
api.include_router(watermeter_router, prefix="/watermeter", tags=["monthroom"])



    