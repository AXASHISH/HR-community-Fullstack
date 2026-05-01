from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime
from app.schemas.auth import RequestStatus
from app.schemas.pagination import PaginationInfo

class UserBase(BaseModel):
    name: str
    email: EmailStr
    company_name: str
    role: Optional[str] = None

class UserUpdate(BaseModel):
    name: Optional[str] = None
    company_name: Optional[str] = None
    role: Optional[str] = None
    status: Optional[RequestStatus] = None
    
class HRCommunityUserOut(BaseModel):
    user_id: int
    name: str
    email: EmailStr
    phone_number: Optional[str] = None
    company_name: Optional[str]
    company_domain: Optional[str]
    role: Optional[str]
    working_address: Optional[str] = None
    company_website: Optional[str] = None
    personal_email: Optional[str] = None
    official_number: Optional[str] = None
    whatsapp_number: Optional[str] = None
    is_email_verified: bool
    status: Optional[str]
    created_at: datetime
    class Config: from_attributes = True

class PaginatedCommunityUserResponse(BaseModel):
    success: bool
    data: List[HRCommunityUserOut]
    pagination: PaginationInfo

class UserResponse(UserBase):
    user_id: int
    company_domain: str
    is_email_verified: bool
    created_at: datetime
    status: Optional[RequestStatus] = None
    class Config: from_attributes = True

class HRUserCompleteResponse(BaseModel):
    user_id: int
    name: Optional[str]
    email: str
    company_id: Optional[int]
    company_name: Optional[str]
    company_domain: Optional[str] = None
    is_email_verified: bool
    role: Optional[str]
    created_at: Optional[datetime]
    phone_number: Optional[str]
    working_address: Optional[str]
    company_website: Optional[str]
    personal_email: Optional[str]
    official_number: Optional[str]
    whatsapp_number: Optional[str]
    why_you_want_to_join: Optional[str] = None
    linkedin_profile: Optional[str] = None
    where_did_you_hear_about_us: Optional[str] = None
    status: RequestStatus
    class Config: from_attributes = True

class HRUserStatusUpdate(BaseModel):
    status: RequestStatus

class HRUsersPaginatedResponse(BaseModel):
    users: List[HRUserCompleteResponse]
    total_count: int
    page: int
    limit: int
    total_pages: int
    has_next: bool
    has_previous: bool
    message: str
    linked_in_profile: Optional[str] = None
    where_did_you_hear_about_us: Optional[str] = None

class LeaderResponse(BaseModel):
    name: str
    email: str
    designation: Optional[str] = None
    profile_image: Optional[str] = None
    company: Optional[dict] = None  # Using dict for CompanyResponse to avoid circular dependency if needed, or import from nomination.py later
    class Config: from_attributes = True
