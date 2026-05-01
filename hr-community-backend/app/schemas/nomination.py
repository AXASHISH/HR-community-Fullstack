from __future__ import annotations
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import List, Optional, Any
from enum import Enum
from fastapi import File, UploadFile
from app.models.hrcommunity import NominationTypeEnum
from app.schemas.auth import RequestStatus
from app.schemas.user import UserResponse

class CategoryStatus(str, Enum):
    OPEN = 'OPEN'
    DEADLINE = 'DEADLINE'
    PRELIMINARY_PANEL_SCREENING = 'PRELIMINARY_PANEL_SCREENING'
    PUBLIC_VOTING_START = 'PUBLIC_VOTING_START'
    FINAL_JURY_REVIEW = 'FINAL_JURY_REVIEW'
    WINNER_ANNOUNCEMENT = 'WINNER_ANNOUNCEMENT'
    CLOSED = 'CLOSED'

class QuestionPurposeEnum(str, Enum):
    nomination = "nomination"
    vote = "vote"

class NominationCategoryBase(BaseModel):
    category_name: str
    description: Optional[str] = None
    is_open: Optional[bool] = True
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    nomination_type: Optional[NominationTypeEnum] = None
    vote_start_date: Optional[datetime] = None
    vote_end_date: Optional[datetime] = None
    category_status: Optional[CategoryStatus] = CategoryStatus.OPEN

class NominationCategoryCreate(NominationCategoryBase): pass

class NominationCategoryUpdate(NominationCategoryBase):
    category_name: Optional[str] = Field(None, max_length=255)

class NominationCategoryResponse(NominationCategoryBase):
    category_id: int
    created_at: Optional[datetime] = None
    class Config: from_attributes = True

class CategoryBase(BaseModel):
    category_name: str
    description: Optional[str] = None

class CategoryCreate(CategoryBase): pass

class CategoryResponse(CategoryBase):
    category_id: int
    is_open: bool
    created_at: Optional[datetime] = None
    class Config: from_attributes = True

class QuestionOptionCreate(BaseModel):
    option_text: str
    points: int

class QuestionCreate(BaseModel):
    question_text: str
    category_id: int
    options: List[QuestionOptionCreate]

class MultipleQuestionsCreate(BaseModel):
    category_id: int
    questions: List[QuestionCreate]

class QuestionOptionResponse(BaseModel):
    option_id: int
    option_text: str
    points: int
    class Config: from_attributes = True

class QuestionResponse(BaseModel):
    question_id: int
    question_text: str
    category_id: int
    options: List[QuestionOptionResponse]
    class Config: from_attributes = True
        
class QuestionOptionUpdate(BaseModel):
    option_id: Optional[int] = None
    option_text: str
    points: int

class QuestionUpdate(BaseModel):
    question_id: Optional[int] = None
    question_text: str
    category_id: int
    options: List[QuestionOptionUpdate]

class MultipleQuestionsUpdate(BaseModel):
    category_id: int
    questions: List[QuestionUpdate]

class MultipleQuestionsResponse(BaseModel):
    category_id: int
    category_name: str
    total_questions_created: int
    questions: List[QuestionResponse]

class NomadBase(BaseModel): # Renamed briefly to avoid conflict if needed, but the original was NominationBase
    category_id: int
    profile_image: UploadFile = File(...) 
    about_company: Optional[str] = None
    company_website: Optional[str] = None
    about_yourself: Optional[str] = None
    achievements: Optional[str] = None
    reason_for_claiming: Optional[str] = None
    phone_number: Optional[str] = None
    supporting_document: Optional[str] = None
    email: Optional[EmailStr] = None
    designation: Optional[str] = None
    industry: Optional[str] = None
    linkedin_profile: Optional[str] = None
    is_winner: Optional[bool] = None

class NominationBase(NomadBase): pass

class NominationCreate(NominationBase):
    leader_id: int

class NominationUpdate(BaseModel):
    profile_image: Optional[str] = None
    about_company: Optional[str] = None
    company_website: Optional[str] = None
    about_yourself: Optional[str] = None
    achievements: Optional[str] = None
    status: Optional[RequestStatus] = None
    reason_for_claiming: Optional[str] = None
    phone_number: Optional[str] = None
    supporting_document: Optional[str] = None
    designation: Optional[str] = None
    industry: Optional[str] = None
    linkedin_profile: Optional[str] = None
    nomination_open: Optional[bool] = None
    is_winner: Optional[bool] = None

class NominationStatusUpdate(BaseModel):
    status: RequestStatus
    reject_reason: Optional[str] = None
    is_winner: Optional[bool] = None

class CompanyResponse(BaseModel):
    company_name: str
    company_domain: Optional[str]
    industry: Optional[str]
    class Config: from_attributes = True

class AwardData(BaseModel):
    name: Optional[str]
    document_url: Optional[str]

class NominationResponse(BaseModel):
    nomination_id: int
    leader_id: int
    category_id: int
    nomination_open: bool
    submitted_at: datetime
    file_path: Optional[str]
    file_verified: bool
    file_score: int
    about_company: Optional[str] = None
    company_website: Optional[str] = None
    about_yourself: Optional[str] = None
    achievements: Optional[str] = None
    reason_for_claiming: Optional[str] = None
    industry: Optional[str] = None
    final_score: Optional[int] = 0
    leader_name: Optional[str] = None
    category_name: Optional[str] = None
    category_status: Optional[CategoryStatus] = None
    company: Optional[CompanyResponse] = None
    end_date: Optional[datetime] = None
    status: Optional[RequestStatus]
    phone_number: Optional[str]
    gender: Optional[str]
    supporting_document: Optional[str]
    cv: Optional[str] = None
    id_card: Optional[str] = None
    email: Optional[EmailStr]
    designation: Optional[str]
    linkedin_profile: Optional[str]
    sharable_link: Optional[str] = None
    vote_start_date: Optional[datetime] = None
    vote_end_date: Optional[datetime] = None
    nomination_type: Optional[str] = None
    profile_image: Optional[str] = None
    work_address: Optional[str] = None
    total_years_of_experience_in_hr: Optional[float] = None
    years_with_current_organization: Optional[float] = None
    educational_qualifications: Optional[str] = None
    professional_certifications: Optional[str] = None
    why_consider: Optional[str] = None
    key_initiatives: Optional[str] = None
    talent_strategy: Optional[str] = None
    employee_engagement: Optional[str] = None
    dei_initiatives: Optional[str] = None
    technology_and_innovation: Optional[str] = None
    quantifiable_outcomes: Optional[str] = None
    awards_and_recognition: Optional[List[AwardData]] = None
    your_vision: Optional[str] = None
    published_articles: Optional[str] = None
    is_winner: Optional[bool] = None
    final_submit: Optional[bool] = None
    reject_reason: Optional[str] = None
    nominating_hr: Optional[dict] = None
    class Config: from_attributes = True

class NominationResponseWithQuestions(NominationResponse):
    questions: Optional[List[QuestionResponse]] = []

class NominationResponseWithOutProfile(BaseModel):
    nomination_id: int
    leader_id: int
    category_id: int
    nomination_open: bool
    submitted_at: datetime
    file_path: Optional[str]
    file_verified: bool
    file_score: int
    about_company: Optional[str] = None
    company_website: Optional[str] = None
    about_yourself: Optional[str] = None
    achievements: Optional[str] = None
    reason_for_claiming: Optional[str] = None
    industry: Optional[str] = None
    final_score: Optional[int] = 0
    leader_name: Optional[str] = None
    category_name: Optional[str] = None
    category_status: Optional[CategoryStatus] = None
    company: Optional[CompanyResponse] = None
    end_date: Optional[datetime] = None
    status: Optional[RequestStatus]
    phone_number: Optional[str]
    gender: Optional[str] = None
    supporting_document: Optional[str]
    cv: Optional[str] = None
    id_card: Optional[str] = None
    email: Optional[EmailStr]
    designation: Optional[str]
    linkedin_profile: Optional[str]
    sharable_link: Optional[str] = None
    vote_start_date: Optional[datetime] = None
    vote_end_date: Optional[datetime] = None
    nomination_type: Optional[str] = None
    work_address: Optional[str] = None
    total_years_of_experience_in_hr: Optional[float] = None
    years_with_current_organization: Optional[float] = None
    educational_qualifications: Optional[str] = None
    professional_certifications: Optional[str] = None
    why_consider: Optional[str] = None
    key_initiatives: Optional[str] = None
    talent_strategy: Optional[str] = None
    employee_engagement: Optional[str] = None
    dei_initiatives: Optional[str] = None
    technology_and_innovation: Optional[str] = None
    quantifiable_outcomes: Optional[str] = None
    awards_and_recognition: Optional[List[AwardData]] = None
    your_vision: Optional[str] = None
    published_articles: Optional[str] = None
    is_winner: Optional[bool] = None
    final_submit: Optional[bool] = None
    reject_reason: Optional[str] = None
    nominating_hr: Optional[dict] = None
    class Config: from_attributes = True

class PaginatedNominationResponse(BaseModel):
    total: int
    page: int
    limit: int
    data: List[NominationResponse]
    
class NominationListResponse(BaseModel):
    nominations: List[NominationResponse]
    total: int
    page: int
    size: int
    has_next: bool

class NominationCategoryBaseFull(BaseModel):
    category_name: str
    description: Optional[str] = None
    is_open: Optional[bool] = True
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    vote_start_date: Optional[datetime] = None
    vote_end_date: Optional[datetime] = None
    nomination_type: Optional[NominationTypeEnum] = None
    category_status: Optional[CategoryStatus] = None
    class Config:
        from_attributes = True
        use_enum_values = True

class NominationAnswerCreate(BaseModel):
    question_id: int
    selected_option_id: int
    
class NominationWithDetails(NominationResponse):
    leader: UserResponse
    category: CategoryResponse
    company: Optional[CompanyResponse] = None

class NominationResponseWithScore(BaseModel):
    nomination_id: int
    user_name: str
    company_name: str
    nomination_type: str
    total_mcq_score: int

class NominationsResponse(BaseModel):
    category_id: int
    nominations: List[NominationResponseWithScore]
    message: str

class NominationScoreUpdate(BaseModel):
    file_score: Optional[int] = None
    status: Optional[RequestStatus] = None

class NominationScoreResponse(BaseModel):
    nomination_id: int
    total_mcq_score: int
    file_score: int
    status: str

class MarkWinnerRequest(BaseModel):
    nomination_id: int

from app.schemas.user import LeaderResponse

class NominationResponseForCategory(BaseModel):
    nomination_id: int
    category_id: int
    nomination_open: bool
    profile_image: Optional[str] = None
    submitted_at: datetime
    sharable_link: Optional[str] = None
    leader: LeaderResponse
    class Config: from_attributes = True
