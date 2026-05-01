from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional

from app.api import deps
from app.models.hrcommunity import CommunityCategoryNomination, CommunityLeaderNominations
from app.schemas.nomination import (
    NominationCategoryResponse, NominationCategoryCreate, NominationCategoryUpdate
)

router = APIRouter()

@router.post("", response_model=NominationCategoryResponse)
def create_nomination_category(category: NominationCategoryCreate, db: Session = Depends(deps.get_db)):
    existing = db.query(CommunityCategoryNomination).filter(
        CommunityCategoryNomination.category_name == category.category_name
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Category name already exists")

    db_category = CommunityCategoryNomination(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

@router.get("", response_model=List[NominationCategoryResponse])
def get_all_nomination_categories(
    db: Session = Depends(deps.get_db),
    search: Optional[str] = None
):
    try:
        query = db.query(CommunityCategoryNomination)
        if search:
            query = query.filter(CommunityCategoryNomination.category_name.ilike(f"%{search}%"))
        
        categories = query.all()
        print(f"✅ Categories fetched successfully: {len(categories)} found")
        return categories
    except Exception as e:
        print(f"❌ Error fetching categories: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching categories: {str(e)}")

@router.put("/{category_id}", response_model=NominationCategoryResponse)
def update_nomination_category(
    category_id: int, 
    category_update: NominationCategoryUpdate, 
    db: Session = Depends(deps.get_db)
):
    db_cat = db.query(CommunityCategoryNomination).filter(
        CommunityCategoryNomination.category_id == category_id
    ).first()
    if not db_cat:
        raise HTTPException(status_code=404, detail="Category not found")
    
    for key, value in category_update.dict(exclude_unset=True).items():
        setattr(db_cat, key, value)
    
    db.commit()
    db.refresh(db_cat)
    return db_cat

@router.delete("/{category_id}")
def delete_nomination_category(category_id: int, db: Session = Depends(deps.get_db)):
    db_cat = db.query(CommunityCategoryNomination).filter(
        CommunityCategoryNomination.category_id == category_id
    ).first()
    if not db_cat:
        raise HTTPException(status_code=404, detail="Category not found")

    # Check for related nominations
    count = db.query(CommunityLeaderNominations).filter(
        CommunityLeaderNominations.category_id == category_id
    ).count()
    if count > 0:
        raise HTTPException(status_code=400, detail="Cannot delete category with existing nominations")

    db.delete(db_cat)
    db.commit()
    return {"message": "Category deleted successfully"}



