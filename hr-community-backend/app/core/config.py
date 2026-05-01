import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = os.getenv("PROJECT_NAME", "HR Community API")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "your-secret-key-change-this-in-production")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    DATABASE_READ_URL: str = os.getenv("DATABASE_READ_URL")

    # ZeptoMail
    ZEPTO_API_URL: str = os.getenv("ZEPTO_API_URL")
    ZEPTO_AUTH_TOKEN: str = os.getenv("ZEPTO_AUTH_TOKEN")
    SENDER_EMAIL: str = os.getenv("SENDER_EMAIL", "noreply@eduskillsfoundation.org")

    # AWS S3
    AWS_ACCESS_KEY_ID: str = os.getenv("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY: str = os.getenv("AWS_SECRET_ACCESS_KEY")
    AWS_REGION: str = os.getenv("AWS_REGION", "ap-south-1")
    S3_BUCKET_NAME: str = os.getenv("S3_BUCKET_NAME")

    # SMS API
    SMS_API_URL: str = os.getenv("SMS_API_URL")
    SMS_AUTH_TOKEN: str = os.getenv("SMS_AUTH_TOKEN")
    SMS_SENDER_ID: str = os.getenv("SMS_SENDER_ID", "EDSKIL")
    SMS_TEMPLATE_ID: str = os.getenv("SMS_TEMPLATE_ID")

    # Backup Email
    BACKUP_EMAIL_URL: str = os.getenv("BACKUP_EMAIL_URL")

    # File Storage
    BASE_FILE_URL: str = "https://erpapi.eduskillsfoundation.org/uploads"
    

settings = Settings()
