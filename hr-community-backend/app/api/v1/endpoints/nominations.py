from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Query
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func
from typing import List, Optional, Any
from datetime import datetime
import json
import base64
from pathlib import Path
from uuid import uuid4

from app.api import deps
from app.core.security import get_current_user_id
from app.core.config import settings
from app.models.hrcommunity import (
    CommunityLeaderNominations, CommunityCategoryNomination, 
    HRCommunityUser, RequestStatus, CommunityQuestion
)
from app.schemas.nomination import (
    NominationResponse, PaginatedNominationResponse, NominationStatusUpdate,
    NominationScoreUpdate, NominationScoreResponse
)
from app.services.email import send_email

router = APIRouter()

def _parse_awards(raw_value: Optional[str]) -> Optional[list]:
    if not raw_value:
        return None
    try:
        parsed = json.loads(raw_value)
        return parsed if isinstance(parsed, list) else None
    except json.JSONDecodeError:
        return None

def serialize_nomination(nom) -> dict:
    category = getattr(nom, "category", None)
    leader = getattr(nom, "leader", None)
    awards = getattr(nom, "awards_and_recognition", None)
    if isinstance(awards, str):
        awards = _parse_awards(awards)

    company = None
    if leader and (leader.company_name or leader.company_domain or nom.industry):
        company = {
            "company_name": leader.company_name or "",
            "company_domain": leader.company_domain,
            "industry": nom.industry,
        }

    return {
        "nomination_id": nom.nomination_id,
        "leader_id": nom.leader_id,
        "category_id": nom.category_id,
        "nomination_open": nom.nomination_open,
        "submitted_at": nom.submitted_at,
        "file_path": nom.file_path,
        "file_verified": nom.file_verified,
        "file_score": nom.file_score,
        "about_company": nom.about_company,
        "company_website": nom.company_website,
        "about_yourself": nom.about_yourself,
        "achievements": nom.achievements,
        "reason_for_claiming": nom.reason_for_claiming,
        "industry": nom.industry,
        "final_score": nom.final_score,
        "leader_name": getattr(leader, "name", None),
        "organization": getattr(leader, "company_name", None),
        "category_name": getattr(category, "category_name", None),
        "category_status": getattr(category, "category_status", None),
        "end_date": getattr(category, "end_date", None),
        "vote_start_date": getattr(category, "vote_start_date", None),
        "vote_end_date": getattr(category, "vote_end_date", None),
        "company": company,
        "status": nom.status,
        "phone_number": nom.phone_number,
        "gender": nom.gender,
        "supporting_document": nom.supporting_document,
        "cv": nom.cv,
        "id_card": nom.id_card,
        "email": nom.email,
        "designation": nom.designation,
        "linkedin_profile": nom.linkedin_profile,
        "sharable_link": nom.sharable_link,
        "nomination_type": nom.nomination_type.value if nom.nomination_type else None,
        "profile_image": nom.profile_image,
        "work_address": nom.work_address,
        "total_years_of_experience_in_hr": nom.total_years_of_experience_in_hr,
        "years_with_current_organization": nom.years_with_current_organization,
        "educational_qualifications": nom.educational_qualifications,
        "professional_certifications": nom.professional_certifications,
        "why_consider": nom.why_consider,
        "key_initiatives": nom.key_initiatives,
        "talent_strategy": nom.talent_strategy,
        "employee_engagement": nom.employee_engagement,
        "dei_initiatives": nom.dei_initiatives,
        "technology_and_innovation": nom.technology_and_innovation,
        "quantifiable_outcomes": nom.quantifiable_outcomes,
        "awards_and_recognition": awards,
        "your_vision": nom.your_vision,
        "published_articles": nom.published_articles,
        "is_winner": nom.is_winner,
        "final_submit": nom.final_submit,
        "reject_reason": nom.reject_reason,
    }

@router.post("/fill-nomination", response_model=NominationResponse)
async def create_nomination(
    leader_id: int = Depends(get_current_user_id),
    category_id: int = Form(...),
    nomination_type: str = Form("individual"),
    designation: Optional[str] = Form(None),
    email: Optional[str] = Form(None),
    phone_number: Optional[str] = Form(None),
    organization: Optional[str] = Form(None),
    db: Session = Depends(deps.get_db)
):
    # Validate category and existing nomination logic...
    existing_nom = db.query(CommunityLeaderNominations).filter(
        CommunityLeaderNominations.leader_id == leader_id,
        CommunityLeaderNominations.category_id == category_id
    ).first()
    
    leader = db.query(HRCommunityUser).filter(HRCommunityUser.user_id == leader_id).first()
    if not leader:
        raise HTTPException(status_code=404, detail="User not found")

    if organization is not None:
        leader.company_name = organization
    if phone_number is not None:
        leader.phone_number = phone_number

    if existing_nom:
        db.commit()
        db.refresh(existing_nom)
        return serialize_nomination(existing_nom)

    new_nom = CommunityLeaderNominations(
        leader_id=leader_id,
        category_id=category_id,
        nomination_type=nomination_type,
        submitted_at=datetime.utcnow(),
        status=RequestStatus.pending,
        designation=designation,
        email=email,
        phone_number=phone_number
    )
    db.add(new_nom)
    db.commit()
    db.refresh(new_nom)
    return serialize_nomination(new_nom)

@router.get("/get-nomination-by-user", response_model=List[NominationResponse])
def get_nomination_by_user(
    leader_id: int = Depends(get_current_user_id),
    db: Session = Depends(deps.get_db)
):
    nominations = db.query(CommunityLeaderNominations).options(
        joinedload(CommunityLeaderNominations.leader),
        joinedload(CommunityLeaderNominations.category)
    ).filter(
        CommunityLeaderNominations.leader_id == leader_id
    ).order_by(CommunityLeaderNominations.submitted_at.desc()).all()
    return [serialize_nomination(nom) for nom in nominations]

@router.put("/nomination/{nomination_id}/section/{section_name}", response_model=NominationResponse)
async def update_nomination_section(
    nomination_id: int,
    section_name: str,
    leader_id: int = Depends(get_current_user_id),
    db: Session = Depends(deps.get_db),
    final_submit: bool = Form(False),
    category_id: Optional[int] = Form(None),
    nomination_type: Optional[str] = Form(None),
    profile_image: Optional[UploadFile] = File(None),
    full_name: Optional[str] = Form(None),
    designation: Optional[str] = Form(None),
    organization: Optional[str] = Form(None),
    work_address: Optional[str] = Form(None),
    gender: Optional[str] = Form(None),
    email: Optional[str] = Form(None),
    phone_number: Optional[str] = Form(None),
    linkedin_profile: Optional[str] = Form(None),
    total_years_of_experience_in_hr: Optional[float] = Form(None),
    years_with_current_organization: Optional[float] = Form(None),
    educational_qualifications: Optional[str] = Form(None),
    professional_certifications: Optional[str] = Form(None),
    why_consider: Optional[str] = Form(None),
    supporting_document: Optional[str] = Form(None),
    cv_url: Optional[str] = Form(None),
    id_card_url: Optional[str] = Form(None),
    key_initiatives: Optional[str] = Form(None),
    talent_strategy: Optional[str] = Form(None),
    employee_engagement: Optional[str] = Form(None),
    dei_initiatives: Optional[str] = Form(None),
    technology_and_innovation: Optional[str] = Form(None),
    quantifiable_outcomes: Optional[str] = Form(None),
    awards_data: Optional[str] = Form(None),
    your_vision: Optional[str] = Form(None),
    published_articles: Optional[str] = Form(None),
):
    nomination = db.query(CommunityLeaderNominations).options(
        joinedload(CommunityLeaderNominations.leader),
        joinedload(CommunityLeaderNominations.category)
    ).filter(
        CommunityLeaderNominations.nomination_id == nomination_id,
        CommunityLeaderNominations.leader_id == leader_id
    ).first()
    if not nomination:
        raise HTTPException(status_code=404, detail="Nomination not found")

    if category_id is not None:
        nomination.category_id = category_id
    if nomination_type is not None:
        nomination.nomination_type = nomination_type

    updates = {
        "designation": designation,
        "email": email,
        "phone_number": phone_number,
        "linkedin_profile": linkedin_profile,
        "work_address": work_address,
        "gender": gender,
        "total_years_of_experience_in_hr": total_years_of_experience_in_hr,
        "years_with_current_organization": years_with_current_organization,
        "educational_qualifications": educational_qualifications,
        "professional_certifications": professional_certifications,
        "why_consider": why_consider,
        "supporting_document": supporting_document,
        "cv": cv_url,
        "id_card": id_card_url,
        "key_initiatives": key_initiatives,
        "talent_strategy": talent_strategy,
        "employee_engagement": employee_engagement,
        "dei_initiatives": dei_initiatives,
        "technology_and_innovation": technology_and_innovation,
        "quantifiable_outcomes": quantifiable_outcomes,
        "your_vision": your_vision,
        "published_articles": published_articles,
    }
    for field, value in updates.items():
        if value is not None:
            setattr(nomination, field, value)

    if full_name is not None:
        nomination.leader.name = full_name
    if organization is not None:
        nomination.leader.company_name = organization
    if phone_number is not None:
        nomination.leader.phone_number = phone_number
    if awards_data is not None:
        nomination.awards_and_recognition = awards_data
    if profile_image is not None:
        content = await profile_image.read()
        nomination.profile_image = base64.b64encode(content).decode("utf-8")
    if final_submit:
        nomination.final_submit = True

    db.commit()
    db.refresh(nomination)
    return serialize_nomination(nomination)

@router.get("/fetch_nomination_details", response_model=PaginatedNominationResponse)
def get_all_nominations(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(deps.get_db)
):
    offset = (page - 1) * limit
    total = db.query(CommunityLeaderNominations).count()
    nominations = db.query(CommunityLeaderNominations).options(
        joinedload(CommunityLeaderNominations.leader),
        joinedload(CommunityLeaderNominations.category)
    ).offset(offset).limit(limit).all()

    return {
        "total": total,
        "page": page,
        "limit": limit,
        "data": [serialize_nomination(nom) for nom in nominations]
    }

@router.patch("/status/{nomination_id}", response_model=NominationResponse)
async def update_nomination_status(
    nomination_id: int,
    payload: NominationStatusUpdate,
    db: Session = Depends(deps.get_db)
):
    db_nom = db.query(CommunityLeaderNominations).filter(
        CommunityLeaderNominations.nomination_id == nomination_id
    ).first()
    if not db_nom:
        raise HTTPException(status_code=404, detail="Nomination not found")

    db_nom.status = payload.status
    if payload.reject_reason:
        db_nom.reject_reason = payload.reject_reason
    
    db.commit()
    db.refresh(db_nom)
    return db_nom

@router.post("/upload-document")
async def upload_document(
    document_type: str = Form(...),
    file: UploadFile = File(...)
):
    # Logic for uploading to local storage or S3...
    file_ext = Path(file.filename).suffix
    file_name = f"{uuid4().hex}{file_ext}"
    # save logic...
    return {"success": True, "document_url": f"{settings.BASE_FILE_URL}/{file_name}"}
