from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from app.api import deps
from app.models.hrcommunity import Agenda, AgendaDetails, Speaker
from app.schemas.agenda import AgendaGetResponse
from app.schemas.speaker import SpeakerResponse

router = APIRouter()

@router.get("/agenda", response_model=List[AgendaGetResponse])
def get_agenda(db: Session = Depends(deps.get_db)):
    agenda = db.query(Agenda).options(
        # joinedload(Agenda.details).joinedload(AgendaDetails.speakers)
    ).all()
    return agenda

@router.get("/speakers", response_model=List[SpeakerResponse])
def get_speakers(db: Session = Depends(deps.get_db)):
    return db.query(Speaker).all()
