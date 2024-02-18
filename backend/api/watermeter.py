from fastapi import Depends, APIRouter, HTTPException,  UploadFile
from models.model import  MonthRoom
from models.schema import MonthRoomSchema, InitialDataSchema
from sqlalchemy.orm import Session
from database import getDb
from api.room import getRoomByNumber
from api.month import getMonthByName
import cv2, numpy , pytesseract
from configparser import ConfigParser
import logging.config
import utils
import imagetotext

router = APIRouter()

@router.get("/")
def getAllNumbers(db: Session = Depends(getDb)):
    datas = db.query(MonthRoom).all()
    return datas
    
@router.post("/")
def addNewConsumption(waterMeter: MonthRoomSchema, db: Session = Depends(getDb)):
    room = getRoomByNumber(waterMeter.roomNumber, db=db) 
    month = getMonthByName(waterMeter.monthName,db=db)
    db_waterMeter = MonthRoom(
        roomId = room.id,
        monthId = month.id,
        meterNumber = waterMeter.meterNumber,
        date = waterMeter.date
    )
    db.add(db_waterMeter)
    db.commit()
    db.refresh(db_waterMeter)
    return db_waterMeter

@router.post("/uploadWaterMeter")
def uploadWaterMeterNumber(data: InitialDataSchema, db: Session = Depends(getDb)):
    imagePath = data.file.filename
    #Read config.ini file
    config_object = ConfigParser()
    config_object.read(Path("config.ini"))
    config = config_object["DEFAULT"]
    
    logging.config.fileConfig('log_config.ini')
    logging.info('Starting .. ')
    logging.info('Stop')
    
    objOfImage = ImageToText(cv2.imread(str(imagePath)))
    binaryImage = objOfImage.preprocess()
    
    cv2.imshow(str(imagePath), binaryImage)
    cv2.waitKey(0)
    
    text = objOfImage.getNumberFromImage(config)
    
    logging.debug("Logging test...")
    
    waterMeterNumber = MonthRoomSchema(
        roomNumber = data.roomNumber,
        monthName = data.monthName,
        meterNumber = text,
        date= data.date
        )
    addNewConsumption(waterMeterNumber, db=db)
    
    return {"msg": "Success uploading!"}