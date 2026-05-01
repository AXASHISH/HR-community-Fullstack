from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from typing import Optional, List
from datetime import datetime

from app.api import deps
from app.models.hrcommunity import Events
from app.schemas.event import EventResponse, EventsResponse
from app.utils.image_handler import save_image

router = APIRouter()

@router.post("", response_model=EventResponse)
async def create_event(
    image: Optional[UploadFile] = File(None),
    name: Optional[str] = Form(None),
    title: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    link: Optional[str] = Form(None),
    start_date: Optional[datetime] = Form(None),
    db: Session = Depends(deps.get_db)
):
    image_data = None
    if image:
        content = await image.read()
        import base64
        image_data = base64.b64encode(content).decode('utf-8')

    db_event = Events(
        image=image_data,
        name=name,
        title=title,
        description=description,
        link=link,
        start_date=start_date
    )
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

@router.get("", response_model=EventsResponse)
def get_all_events(db: Session = Depends(deps.get_db)):
    events = db.query(Events).all()
    return {"events": events, "message": "Events retrieved successfully"}

@router.get("/{event_id}", response_model=EventResponse)
def get_event(event_id: int, db: Session = Depends(deps.get_db)):
    event = db.query(Events).filter(Events.event_id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event
