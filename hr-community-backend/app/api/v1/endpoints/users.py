from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List, Optional

from app.api import deps
from app.core.security import get_current_user_id
from app.models.hrcommunity import HRCommunityUser, RequestStatus
from app.schemas.user import (
    HRCommunityUserOut, PaginatedCommunityUserResponse, UserUpdate, UserResponse
)

router = APIRouter()

@router.get("", response_model=PaginatedCommunityUserResponse)
async def get_all_users(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    status: Optional[RequestStatus] = None,
    search: Optional[str] = None,
    db: Session = Depends(deps.get_db)
):
    offset = (page - 1) * limit
    query = db.query(HRCommunityUser)
    
    if status:
        query = query.filter(HRCommunityUser.status == status)
    
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            or_(
                HRCommunityUser.name.ilike(search_term),
                HRCommunityUser.email.ilike(search_term),
                HRCommunityUser.company_name.ilike(search_term)
            )
        )
    
    total_count = query.count()
    users = query.order_by(HRCommunityUser.created_at.desc()).offset(offset).limit(limit).all()
    
    total_pages = (total_count + limit - 1) // limit
    
    return {
        "success": True,
        "data": users,
        "pagination": {
            "current_page": page,
            "per_page": limit,
            "total_items": total_count,
            "total_pages": total_pages,
            "has_next": page < total_pages,
            "has_prev": page > 1,
            "next_page": page + 1 if page < total_pages else None,
            "prev_page": page - 1 if page > 1 else None
        }
    }

@router.get("/{user_id}", response_model=UserResponse)
async def get_user_by_id(user_id: int, db: Session = Depends(deps.get_db)):
    user = db.query(HRCommunityUser).filter(HRCommunityUser.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: int, 
    user_update: UserUpdate, 
    db: Session = Depends(deps.get_db)
):
    user = db.query(HRCommunityUser).filter(HRCommunityUser.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    update_data = user_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(user, field, value)
    
    db.commit()
    db.refresh(user)
    return user
