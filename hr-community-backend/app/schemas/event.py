from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class EventResponse(BaseModel):
    event_id: int
    image: Optional[str] 
    name: Optional[str]
    title: Optional[str]
    description: Optional[str]
    link: Optional[str]
    start_date: Optional[datetime]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]
    class Config: from_attributes = True

class EventsResponse(BaseModel):
    events: List[EventResponse]
    message: str
