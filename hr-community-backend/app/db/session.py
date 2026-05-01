from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

# Base classes for Write and Read models
Base = declarative_base()
BaseRead = declarative_base()

# Engines
engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)
engine_read = create_engine(settings.DATABASE_READ_URL or settings.DATABASE_URL, pool_pre_ping=True)

# Session Factories
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
SessionLocalRead = sessionmaker(autocommit=False, autoflush=False, bind=engine_read)
