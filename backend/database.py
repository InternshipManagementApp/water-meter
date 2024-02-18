from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base

SQLALCHEMY_DATABASE_URL = "sqlite:///./waterMeter_app.db"
#connect to the database, to resolve - thread safety, the connection to not be in the same threads
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
#session for the communication
#autocommit - manually COMMIT
# autoflush - it will not automatically issue a SELECT command to the database before each change
#bind- identify with which database to communicate
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def  getDb():
    try:
        db = SessionLocal() #new database session
        yield db #generator function - can be used like an iterator object
    finally:
        db.close() 
    
