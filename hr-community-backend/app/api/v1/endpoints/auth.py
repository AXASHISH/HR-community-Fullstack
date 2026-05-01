from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.api import deps
from app.core import security
from app.core.config import settings
from app.models.hrcommunity import HRCommunityUser, RequestStatus
from app.schemas.auth import (
    EmailOnlyRequest,
    LoginRequest,
    LoginOTPVerify,
    LoginResponse,
    EmailVerifyResponse,
    OTPAndDetailsRequest
)
from app.utils.helpers import generate_otp, is_corporate_email
from app.services.email import send_email

router = APIRouter()

# ================= LOGIN OTP =================

@router.post("/login/request", response_model=dict)
async def request_login_otp(login_request: LoginRequest, db: Session = Depends(deps.get_db)):
    user = db.query(HRCommunityUser).filter(HRCommunityUser.email == login_request.email).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found. Please register first.")

    if not user.is_email_verified:
        raise HTTPException(status_code=403, detail="Please verify your email first.")

    login_otp = "123456" if settings.BYPASS_OTP else generate_otp()

    user.login_otp = login_otp
    user.login_otp_expires_at = datetime.utcnow() + timedelta(minutes=5)
    db.commit()

    if not settings.BYPASS_OTP:
        send_email(
            recipient=user.email,
            recipient_name=user.name,
            subject="Login OTP",
            htmlbody="Your login OTP is {otp}",
            company_name=user.company_name,
            otp=login_otp
        )

    return {"success": True, "message": "Login OTP sent", "email": user.email}


# ================= LOGIN VERIFY =================

@router.post("/login/verify", response_model=LoginResponse)
async def verify_login_otp(login_verify: LoginOTPVerify, db: Session = Depends(deps.get_db)):

    if settings.BYPASS_OTP:
        if login_verify.otp != "123456":
            raise HTTPException(status_code=400, detail="Invalid OTP")

        user = db.query(HRCommunityUser).filter(
            HRCommunityUser.email == login_verify.email
        ).first()
    else:
        user = db.query(HRCommunityUser).filter(
            HRCommunityUser.email == login_verify.email,
            HRCommunityUser.login_otp == login_verify.otp
        ).first()

    if not user or (
        user.login_otp_expires_at and user.login_otp_expires_at < datetime.utcnow()
    ):
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")

    if not settings.BYPASS_OTP:
        if user.status != RequestStatus.approved:
            raise HTTPException(status_code=403, detail="Account not approved")

    user.login_otp = None
    user.login_otp_expires_at = None
    db.commit()

    access_token = security.create_access_token(
        user_id=user.user_id,
        email=user.email
    )

    return {
        "success": True,
        "message": "Login successful",
        "access_token": access_token,
        "user": {
            "user_id": user.user_id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "company_name": user.company_name,
            "phone_number": user.phone_number,
        }
    }


# ================= EMAIL INITIATE =================

@router.post("/verify-email/initiate", response_model=dict)
async def initiate_email_verification(request: EmailOnlyRequest, db: Session = Depends(deps.get_db)):

    if not is_corporate_email(request.email):
        raise HTTPException(status_code=400, detail="Use corporate email")

    otp = "123456" if settings.BYPASS_OTP else generate_otp()

    user = db.query(HRCommunityUser).filter(HRCommunityUser.email == request.email).first()

    if user:
        if user.is_email_verified:
            raise HTTPException(status_code=400, detail="Email already verified")

        user.otp = otp
        user.name = request.name
        user.otp_expires_at = datetime.utcnow() + timedelta(minutes=5)

    else:
        user = HRCommunityUser(
            email=request.email,
            name=request.name,
            otp=otp,
            otp_expires_at=datetime.utcnow() + timedelta(minutes=5),
            is_email_verified=False,
            company_domain=request.email.split("@")[1].lower(),
            status=RequestStatus.pending
        )
        db.add(user)

    db.commit()

    if not settings.BYPASS_OTP:
        send_email(
            request.email,
            request.name,
            "Verify Email",
            "Your OTP is {otp}",
            otp=otp
        )

    return {
        "success": True,
        "message": "OTP sent (bypass)" if settings.BYPASS_OTP else "OTP sent",
        "otp": otp if settings.BYPASS_OTP else None
    }


# ================= EMAIL CONFIRM =================

@router.post("/verify-email/confirm", response_model=EmailVerifyResponse)
async def confirm_email_verification(request: OTPAndDetailsRequest, db: Session = Depends(deps.get_db)):

    if settings.BYPASS_OTP:
        if request.otp != "123456":
            raise HTTPException(status_code=400, detail="Invalid OTP")

        user = db.query(HRCommunityUser).filter(
            HRCommunityUser.email == request.email,
            HRCommunityUser.is_email_verified == False
        ).first()
    else:
        user = db.query(HRCommunityUser).filter(
            HRCommunityUser.email == request.email,
            HRCommunityUser.otp == request.otp,
            HRCommunityUser.is_email_verified == False
        ).first()

    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or OTP")

    if user.otp_expires_at and user.otp_expires_at < datetime.utcnow():
        raise HTTPException(status_code=400, detail="OTP expired")

    # Save user details
    user.name = request.name
    user.company_name = request.company_name
    user.role = request.role
    user.phone_number = request.phone_number
    user.working_address = request.working_address
    user.company_website = request.company_website
    user.personal_email = request.personal_email
    user.official_number = request.official_number
    user.whatsapp_number = request.whatsapp_number

    user.is_email_verified = True
    user.status = RequestStatus.approved
    user.otp = None
    user.otp_expires_at = None
    user.created_at = datetime.utcnow()

    db.commit()
    db.refresh(user)

    return EmailVerifyResponse(
        success=True,
        message="Email verified successfully",
        user_id=user.user_id
    )
