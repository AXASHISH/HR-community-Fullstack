from sqlalchemy import Column, Integer, String, Text, Boolean
from app.db.session import Base

class Template(Base):
    __tablename__ = 'templates'

    temp_id = Column(Integer, primary_key=True, autoincrement=True)
    temp_name = Column(String(100), unique=True, nullable=False)
    temp_sub = Column(String(255), nullable=False)
    temp_body = Column(Text, nullable=False)
    is_active = Column(String(1), default='1')  # Code uses '1' as active
