from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.api import deps
from app.models.hrcommunity import HrCommunityMember
from app.schemas.community import CommunityMemberResponse, PaginatedCommunityMemberResponse

router = APIRouter()

@router.get("", response_model=PaginatedCommunityMemberResponse)
def get_community_members(
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(deps.get_db)
):
    total = db.query(HrCommunityMember).count()
    items = db.query(HrCommunityMember).order_by(HrCommunityMember.sequence_no).offset(skip).limit(limit).all()
    
    return {
        "total": total,
        "skip": skip,
        "limit": limit,
        "has_next": (skip + limit) < total,
        "items": items
    }

@router.get("/{member_id}", response_model=CommunityMemberResponse)
def get_member(member_id: int, db: Session = Depends(deps.get_db)):
    member = db.query(HrCommunityMember).filter(HrCommunityMember.member_id == member_id).first()
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    return member
