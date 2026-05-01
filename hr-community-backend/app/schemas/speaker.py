from pydantic import BaseModel
from typing import List, Optional
from app.models.hrcommunity import AgendaType, GuestType

class SpeakerResponse(BaseModel):
    id: int
    agenda_details_id: int
    speaker_name: str
    position_role: Optional[str] = None
    profile_image: Optional[str] = None
    topic: Optional[str] = None
    class Config: from_attributes = True

class SpeakerInput(BaseModel):
    speaker_name: str
    position_role: Optional[str] = None
    profile_image_base64: Optional[str] = None
    topic: Optional[str] = None

class SpeakerCreateInput(BaseModel):
    agenda_details_id: int
    speakers: List[SpeakerInput]

class SpeakerEditInput(BaseModel):
    speaker_name: Optional[str]
    position_role: Optional[str]
    profile_image_base64: Optional[str]
    topic: Optional[str] = None

class SpeakerGetResponse(BaseModel):
    id: int
    agenda_details_id: int
    speaker_name: str
    position_role: Optional[str] = None
    profile_image: Optional[str] = None
    topic: Optional[str] = None
    class Config: from_attributes = True

class CommunitySpeakerCreate(BaseModel):
    speaker_type: str
    guest_type: str
    speaker_name: str
    designation: Optional[str] = None
    profile_image: Optional[str] = None
    company_name: Optional[str] = None
    image_align: Optional[str] = 'center'
    max_per_row: Optional[int] = 3

class SpeakerUpdate(BaseModel):
    speaker_type: Optional[str] = None
    guest_type: Optional[str] = None
    speaker_name: Optional[str] = None
    designation: Optional[str] = None
    profile_image: Optional[str] = None
    company_name: Optional[str] = None
    image_align: Optional[str] = None
    max_per_row: Optional[int] = None

class CommunitySpeakerResponse(BaseModel):
    speaker_id: int
    speaker_type: AgendaType
    guest_type: GuestType
    speaker_name: str
    designation: Optional[str]
    profile_image: Optional[str]
    company_name: Optional[str]
    image_align: Optional[str]
    max_per_row: Optional[int]
    sequence_no: Optional[int] = 0
    class Config: from_attributes = True

class SpeakerSequenceUpdate(BaseModel):
    speaker_id: int
    sequence_no: int

class BulkSequenceUpdateRequest(BaseModel):
    updates: List[SpeakerSequenceUpdate]
