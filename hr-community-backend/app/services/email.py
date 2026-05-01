import requests
import hashlib
from typing import Any, Dict, Optional
from app.core.config import settings

def build_hr_otp_email(
    recipient_name: str,
    company_name: str,
    otp: str,
    purpose: str = "Email Verification",
    expires_in_minutes: int = 5,
) -> str:
    """Build the styled HR Community Awards OTP email."""
    safe_company_name = company_name or "your organization"

    return f"""
    <div style="max-width: 760px; margin: 0 auto; padding: 36px 26px; border: 1px solid #d9d9d9; border-radius: 8px; font-family: Arial, Helvetica, sans-serif; color: #0f172a; line-height: 1.6;">
      <h2 style="text-align: center; margin: 0 0 28px; font-size: 28px; font-weight: 700; color: #18324f;">
        HR Community Awards - {purpose}
      </h2>

      <p style="font-size: 18px; margin: 0 0 18px;">Dear <strong>{recipient_name}</strong>,</p>
      <p style="font-size: 18px; margin: 0 0 26px;">
        Thank you for registering for HR Community Awards from <strong>{safe_company_name}</strong>.
      </p>

      <div style="background: #f8fafc; border-radius: 6px; padding: 42px 20px; text-align: center; margin: 0 0 26px;">
        <p style="font-size: 20px; margin: 0 0 20px;">Your verification OTP is:</p>
        <div style="font-size: 44px; line-height: 1; font-weight: 700; letter-spacing: 10px; color: #ef5148;">
          {otp}
        </div>
      </div>

      <p style="font-size: 18px; margin: 0 0 18px;"><strong>This OTP will expire in {expires_in_minutes} minutes.</strong></p>
      <p style="font-size: 18px; margin: 0 0 40px;">If you did not request this verification, please ignore this email.</p>

      <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 0 0 34px;">

      <p style="font-size: 18px; margin: 0; color: #4b5563;">
        Best regards,<br>
        <strong>HR Community Awards Team</strong><br>
        EduSkills Foundation
      </p>
    </div>
    """

def send_email_zepto(recipient: str, recipient_name: str, subject: str, htmlbody: str, **kwargs) -> bool:
    """Send email using ZeptoMail API"""
    headers = {
        "accept": "application/json",
        "authorization": settings.ZEPTO_AUTH_TOKEN,
        "cache-control": "no-cache",
        "content-type": "application/json",
    }
    
    # Format the HTML body with provided parameters
    try:
        formatted_body = htmlbody.format(
            name=recipient_name,
            recipient_name=recipient_name,
            category_name=kwargs.get('category_name', 'N/A'),
            company_name=kwargs.get('company_name', 'N/A'),
            industry_name=kwargs.get('industry_name', 'N/A'), 
            phone_number=kwargs.get('phone_number', 'N/A'),
            recipient=recipient,
            email=recipient,
            corporate_designation=kwargs.get('corporate_designation', 'N/A'),
            reason=kwargs.get('reason', 'N/A'),
            otp=kwargs.get('otp', ''),
            vote_start_date=kwargs.get('vote_start_date', 'Not specified'),
            vote_end_date=kwargs.get('vote_end_date', 'Not specified')
        )
    except Exception:
        formatted_body = htmlbody
    
    data = {
        "from": {"address": settings.SENDER_EMAIL},
        "to": [{"email_address": {"address": recipient, "name": recipient_name}}],
        "subject": subject,
        "htmlbody": formatted_body,
    }
    
    try:
        response = requests.post(settings.ZEPTO_API_URL, headers=headers, json=data, timeout=30)
        return response.status_code == 200
    except Exception:
        return False

def send_email_backup(recipient: str, recipient_name: str, subject: str, htmlbody: str, company_name: str, **kwargs) -> bool:
    """Send email using backup API (SES)"""
    email_hash = hashlib.sha256(f"{subject}||{recipient}||{recipient_name}||{htmlbody}".encode()).hexdigest()
    
    try:
        formatted_body = htmlbody.format(
            name=recipient_name,
            recipient_name=recipient_name,
            company_name=company_name or "N/A",
            industry_name=kwargs.get('industry_name', "N/A"), 
            phone_number=kwargs.get('phone_number', "N/A"),
            recipient=recipient,
            email=recipient,
            corporate_designation=kwargs.get('corporate_designation', "N/A"),
            reason=kwargs.get('reason', "Not specified"),
            otp=kwargs.get('otp', "")
        )
    except Exception:
        formatted_body = htmlbody

    data = {
        'email_hash': email_hash,
        'subject': subject,
        'recipient': recipient,
        'recipient_name': recipient_name,
        'htmlbody': formatted_body,
        'company_name': company_name or "N/A",
        'industry_name': kwargs.get('industry_name', "N/A"),
        'phone_number': kwargs.get('phone_number', "N/A"),
        'corporate_designation': kwargs.get('corporate_designation', "N/A"),
        'reason': kwargs.get('reason', "N/A"),
    }
    
    try:
        response = requests.post(settings.BACKUP_EMAIL_URL, json=data, timeout=30)
        return response.status_code == 200
    except Exception:
        return False

def send_email(recipient: str, recipient_name: str, subject: str, htmlbody: str, **kwargs) -> bool:
    """Try ZeptoMail first, then fallback to backup"""
    if send_email_zepto(recipient, recipient_name, subject, htmlbody, **kwargs):
        return True
    fallback_kwargs = kwargs.copy()
    company_name = fallback_kwargs.pop('company_name', 'N/A')
    return send_email_backup(recipient, recipient_name, subject, htmlbody, company_name, **fallback_kwargs)
