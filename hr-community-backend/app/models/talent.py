from sqlalchemy import Column, Integer, String
from app.db.session import Base

class Company(Base):
    __tablename__ = 'companies'

    company_id = Column(Integer, primary_key=True, autoincrement=True)
    company_name = Column(String(255), nullable=False)
    company_domain = Column(String(255), unique=True, nullable=False)
    industry = Column(String(255), nullable=True)
