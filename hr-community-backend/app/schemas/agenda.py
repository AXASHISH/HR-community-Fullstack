import json
from pydantic import BaseModel, validator
from typing import List, Optional
from datetime import datetime
from enum import Enum
from app.models.hrcommunity import AgendaType
from app.schemas.speaker import SpeakerResponse, SpeakerGetResponse

class AgendaDetailResponse(BaseModel):
    start_time: datetime
    end_time: datetime
    title: str
    sub_title: Optional[List[str]]
    speakers: List[SpeakerResponse]

    @validator('sub_title', pre=True)
    def parse_sub_title(cls, value):
        if isinstance(value, str):
            try:
                return [item for item in json.loads(value) if item is not None]
            except:
                return [value]
        return value
    class Config: from_attributes = True

class AgendaDayResponse(BaseModel):
    date: str
    type: str
    details: List[AgendaDetailResponse]

class AgendaResponse(BaseModel):
    days: List[AgendaDayResponse]
    message: Optional[str] = None

class AgendaTypeEnum(str, Enum):
    connect = "connect"
    summit = "summit"
    award = "award"

class AgendaDetailInput(BaseModel):
    start_time: datetime
    end_time: datetime
    title: str
    sub_title: Optional[str] = None

class AgendaCreateInput(BaseModel):
    date: datetime
    type: AgendaTypeEnum
    details: List[AgendaDetailInput]

class AgendaDetailEditInput(BaseModel):
    id: int # Required to identify which detail to update
    start_time: Optional[datetime]
    end_time: Optional[datetime]  
    title: Optional[str]
    sub_title: Optional[str] = None

class AgendaWithDetailsEditInput(BaseModel):
    date: Optional[datetime]
    type: Optional[AgendaTypeEnum]
    details: Optional[List[AgendaDetailEditInput]]

# For agenda details - used in GET endpoints  
class AgendaDetailGetResponse(BaseModel):
    id: int
    agenda_id: int
    start_time: datetime
    end_time: datetime
    title: str
    sub_title: Optional[str] = None
    speakers: List[SpeakerGetResponse] = []
    class Config: from_attributes = True

# For single agenda - used in GET endpoints
class AgendaGetResponse(BaseModel):
    id: int
    date: datetime
    type: AgendaType # This will be the enum value as string
    details: List[AgendaDetailGetResponse] = []
    class Config: from_attributes = True
