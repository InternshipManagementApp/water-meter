from fastapi import Depends, APIRouter, HTTPException,  UploadFile, File, Form
from models.model import  MonthRoom
from models.schema import MonthRoomSchema
from sqlalchemy.orm import Session
from database import getDb
from api.room import getRoomByNumber
from api.month import getMonthByName
import cv2, numpy
import pytesseract
from configparser import ConfigParser
from pathlib import Path 
import logging.config
from imagetotext import ImageToText
from datetime import datetime

#pytesseract.pytesseract.tesseract_cmd = r'C:\Users\Anita\AppData\Local\Programs\Tesseract-OCR\tesseract.exe' 

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
async def uploadWaterMeterNumber(roomNumber: int = Form(...),file: UploadFile = File(...), db: Session = Depends(getDb)):
    contents = await file.read()
    nparr = numpy.fromstring(contents, numpy.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    #Read config.ini file
    config_object = ConfigParser()
    config_object.read(Path("config.ini"))
    config = config_object["DEFAULT"]
    
    logging.config.fileConfig('log_config.ini')
    logging.info('Starting .. ')
    logging.info('Stop')
    
    objOfImage = ImageToText(img)
    binaryImage = objOfImage.preprocess()
    
    
    text = objOfImage.getNumberFromImage(config)
    
    logging.debug("Logging test...")
    
    today = datetime.today()
    month = today.strftime("%B")
    
    
    waterMeterNumber = MonthRoomSchema(
        roomNumber = roomNumber,
        monthName = month,
        meterNumber = text,
        date= str(today)
        )
    
    
    addNewConsumption(waterMeterNumber, db=db)
    
    return {"msg": "Success uploading!" + text}