from models.model import Month
from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy.orm import Session
from database import getDb

INITIAL_DATA = {
    'months': [
        {'monthName': 'January'},
        {'monthName': 'February'},
        {'monthName': 'March'},
        {'monthName': 'April'},
        {'monthName': 'May'},
        {'monthName': 'June'},
        {'monthName': 'July'},
        {'monthName': 'August'},
        {'monthName': 'September'},
        {'monthName': 'October'},
        {'monthName': 'November'},
        {'monthName': 'December'},
    ]
}

def initializeTable(target, connection, **kw):
    tablename = str(target)
    if tablename in INITIAL_DATA and len(INITIAL_DATA[tablename]) > 0:
        connection.execute(target.insert(), INITIAL_DATA[tablename])

router = APIRouter()

@router.get("/byName/")
def getMonthByName(monthName: str, db: Session = Depends(getDb)):
    month = db.query(Month).filter(Month.monthName == monthName).first()
    if month is None:
        raise HTTPException(status_code=404, detail="Month not found")
    return month