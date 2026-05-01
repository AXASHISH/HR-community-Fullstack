from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class SendOtpRequest(BaseModel):
    nomination_id: int
    email: EmailStr

class SendOtpResponse(BaseModel):
    message: str

class MCQAnswer(BaseModel):
    question_id: int
    option_ids: List[int]

class VoteOtpVerifyRequest(BaseModel):
    nomination_id: int
    email: EmailStr
    otp: str

class MCQVoteRequest(BaseModel):
    nomination_id: int
    email: EmailStr
    category_id: int
    answers: List[MCQAnswer]

class MCQVoteDetail(BaseModel):
    question_id: int
    question_text: str
    option_id: int
    option_text: str
    points: int

class MCQVoteResponse(BaseModel):
    nomination_id: int
    total_mcq_score: int
    details: List[MCQVoteDetail]
    message: str

class VoteResponse(BaseModel):
    vote_id: int
    email: str
    nomination_id: int
    voted_at: datetime
    is_verified: bool
    class Config: from_attributes = True

class VoteCountItem(BaseModel):
    nomination_id: int
    category_id: int
    leader_id: int
    vote_count: int
    total_points: int

class AnswerDetail(BaseModel):
    question_id: int
    selected_option_id: int
    points: int

class VoteDetailItem(BaseModel):
    nomination_id: int
    category_id: int
    leader_id: int
    vote_id: int
    email: str
    voted_at: datetime
    is_verified: bool
    answers: List[AnswerDetail]

class VoteDetailsResponse(BaseModel):
    details: List[VoteDetailItem]
    total_votes: int
    total_points: int

class VoteCountItemExtended(BaseModel):
    nomination_id: int
    category_id: int
    leader_id: int
    vote_count: int
    total_points: int
    file_score: int

class SubmitVoteRequest(BaseModel):
    email: EmailStr
    nomination_id: int
    category_id: int
    name: Optional[str] = None
    phone_number: Optional[str] = None
    designation: Optional[str] = None
    company_name: Optional[str] = None
    company_website: Optional[str] = None
    linkedin_profile: Optional[str] = None

class SubmitVoteResponse(BaseModel):
    nomination_id: int
    message: str
    details: Optional[List] = []
