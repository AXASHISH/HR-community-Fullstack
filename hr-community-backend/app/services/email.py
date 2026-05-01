import requests
import hashlib
from typing import Any, Dict, Optional
from app.core.config import settings

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
    return send_email_backup(recipient, recipient_name, subject, htmlbody, kwargs.get('company_name', 'N/A'), **kwargs)
