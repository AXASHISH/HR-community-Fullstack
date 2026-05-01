from typing import Generator
from app.db.session import SessionLocal, SessionLocalRead

def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

def get_db_read() -> Generator:
    try:
        db = SessionLocalRead()
        yield db
    finally:
        db.close()
