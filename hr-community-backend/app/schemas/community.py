from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class CommunityMemberResponse(BaseModel):
    member_id: int
    name: str
    role: str
    company: str
    profile_image: Optional[str]
    sequence_no: int 
    created_at: Optional[datetime]
    updated_at: Optional[datetime]
    class Config: from_attributes = True

class MemberSequenceUpdate(BaseModel):
    member_id: int
    sequence_no: int
    
class BulkMemberSequenceUpdateRequest(BaseModel):
    updates: List[MemberSequenceUpdate]
    
class PaginatedCommunityMemberResponse(BaseModel):
    total: int
    skip: int
    limit: int
    has_next: bool
    items: List[CommunityMemberResponse]
