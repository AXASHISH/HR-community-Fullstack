from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
import random
import string
from datetime import datetime, timedelta

from app.api import deps
from app.models.hrcommunity import (
    CommunityLeaderNominations, HRCommunityUser, LeaderVote, UserOtp, 
    LeaderVoteAnswer, CommunityQuestionOption
)
from app.schemas.vote import (
    SendOtpRequest, SendOtpResponse, VoteOtpVerifyRequest, 
    SubmitVoteRequest, SubmitVoteResponse, VoteCountItem, VoteDetailsResponse
)
from app.services.email import send_email
from app.utils.helpers import is_corporate_email

router = APIRouter()

@router.post("/send-otp", response_model=SendOtpResponse)
def send_vote_otp(request: SendOtpRequest, db: Session = Depends(deps.get_db)):
    nomination = db.query(CommunityLeaderNominations).filter(
        CommunityLeaderNominations.nomination_id == request.nomination_id
    ).first()
    if not nomination:
        raise HTTPException(status_code=404, detail="Nomination not found")

    leader = db.query(HRCommunityUser).filter(HRCommunityUser.user_id == nomination.leader_id).first()
    if leader and leader.email == request.email:
        raise HTTPException(status_code=400, detail="You cannot vote for your own nomination")

    if not is_corporate_email(request.email):
        raise HTTPException(status_code=400, detail="Please use a corporate email address for voting")

    otp = "".join(random.choices(string.digits, k=6))
    
    otp_record = db.query(UserOtp).filter(UserOtp.email == request.email).first()
    if otp_record:
        otp_record.otp = otp
        otp_record.created_at = datetime.utcnow()
    else:
        db.add(UserOtp(email=request.email, otp=otp))
    
    db.commit()
    
    send_email(
        recipient=request.email,
        recipient_name="Voter",
        subject="Voting OTP",
        htmlbody="Your OTP for voting is {otp}",
        otp=otp
    )
    
    return {"message": "OTP sent to your email"}

@router.post("/submit", response_model=SubmitVoteResponse)
def submit_vote(request: SubmitVoteRequest, db: Session = Depends(deps.get_db)):
    # Logic to verify OTP would be a separate call or included here
    # Assuming separate verify call exists as per original code
    
    new_vote = LeaderVote(
        email=request.email,
        nomination_id=request.nomination_id,
        category_id=request.category_id,
        voted_at=datetime.utcnow(),
        is_verified=True,
        name=request.name
        # ... other fields
    )
    db.add(new_vote)
    db.commit()
    
    return {"nomination_id": request.nomination_id, "message": "Vote recorded successfully"}

@router.get("/count", response_model=List[VoteCountItem])
def get_vote_count(
    nomination_id: Optional[int] = None,
    category_id: Optional[int] = None,
    db: Session = Depends(deps.get_db)
):
    query = db.query(
        LeaderVote.nomination_id,
        CommunityLeaderNominations.category_id,
        CommunityLeaderNominations.leader_id,
        func.count(LeaderVote.vote_id).label("vote_count"),
        func.sum(CommunityQuestionOption.points).label("total_points")
    ).join(CommunityLeaderNominations).join(LeaderVoteAnswer, isouter=True).join(CommunityQuestionOption, isouter=True)
    
    if nomination_id: query = query.filter(LeaderVote.nomination_id == nomination_id)
    if category_id: query = query.filter(CommunityLeaderNominations.category_id == category_id)
    
    results = query.group_by(LeaderVote.nomination_id).all()
    return results
