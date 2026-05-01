from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from enum import Enum

class RequestStatus(str, Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"

class EmailOnlyRequest(BaseModel):
    email: str
    name: str

class OTPAndDetailsRequest(BaseModel):
    email: str
    otp: str
    name: str
    company_name: str
    role: Optional[str] = None
    phone_number: Optional[str] = None
    working_address: Optional[str] = None
    company_website: Optional[str] = None
    personal_email: Optional[str] = None
    official_number: Optional[str] = None
    whatsapp_number: Optional[str] = None
    
class OTPAndDetailsRequestRegisteredUsers(BaseModel):
    email: str
    otp: str
    name: str
    company_name: str
    role: Optional[str] = None
    phone_number: Optional[str] = None
    working_address: Optional[str] = None
    company_website: Optional[str] = None
    personal_email: Optional[str] = None
    official_number: Optional[str] = None
    whatsapp_number: Optional[str] = None
    linkedin_profile: Optional[str] = None
    where_did_you_hear_about_us: Optional[str] = None
    why_you_want_to_join: Optional[str] = None

class EmailVerifyInitiate(BaseModel):
    email: EmailStr
    name: str
    company_name: str
    company_id: Optional[int] = None
    phone_number: Optional[str] = None
    role: Optional[str] = None
    working_address: Optional[str] = None
    company_website: Optional[str] = None
    personal_email: Optional[str] = None
    official_number: Optional[str] = None
    whatsapp_number: Optional[str] = None

class OTPVerifyRequest(BaseModel):
    email: EmailStr
    otp: str

class EmailVerifyResponse(BaseModel):
    success: bool
    message: str
    user_id: Optional[int] = None

class LoginRequest(BaseModel):
    email: EmailStr

class LoginOTPVerify(BaseModel):
    email: EmailStr
    otp: str

class LoginResponse(BaseModel):
    success: bool
    message: str
    access_token: Optional[str] = None
    user: Optional[dict] = None

class PhoneOtpSendRequest(BaseModel):
    phone: str = Field(..., example="")
    email: EmailStr

class PhoneOtpSendResponse(BaseModel):
    success: bool
    message: str
    phone: str
    expires_in_minutes: int

class PhoneOtpVerifyRequest(BaseModel):
    phone: str = Field(..., example="6371118692")
    otp: str = Field(..., min_length=6, max_length=6)

class PhoneOtpVerifyResponse(BaseModel):
    success: bool
    message: str
    phone: str
