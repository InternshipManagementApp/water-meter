from typing import Optional, List

from sqlalchemy import ForeignKey, Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base


class MonthRoom(Base):
    __tablename__ = "monthroom"
    
    id = Column(Integer, primary_key=True, index=True)
    roomId = Column(ForeignKey('rooms.id'))
    monthId = Column(ForeignKey('months.id'))
    meterNumber = Column(String(9), index = True)
    date = Column(String, index = True)

class Room(Base):
    __tablename__ = "rooms"

    id = Column(Integer, primary_key=True, index=True)
    roomNumber = Column(Integer, index=True)
    months = relationship("Month", secondary="monthroom", back_populates='rooms')

class Month(Base):
    __tablename__ = "months"

    id = Column(Integer, primary_key=True, index=True)
    monthName = Column(String(25), index=True)
    rooms = relationship("Room", secondary="monthroom", back_populates='months')
    
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    userName = Column(String, index=True)
    personType = Column(String, index=True)
    email = Column(String, index=True)
    password = Column(String, index=True)
    telephone = Column(String, index=True)
    