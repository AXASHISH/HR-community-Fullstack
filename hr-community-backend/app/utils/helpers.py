import random
import string

def generate_otp(length: int = 6) -> str:
    """Generate a numeric OTP of specified length"""
    return "".join(random.choices(string.digits, k=length))

def extract_domain_from_email(email: str) -> str:
    """Extract domain from email address"""
    if not email or "@" not in email:
        return ""
    return email.split('@')[1].lower()

def is_corporate_email(email: str) -> bool:
    """Check if email domain appears to be corporate"""
    domain = extract_domain_from_email(email)
    
    personal_domains = {
        'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 
        'aol.com', 'icloud.com', 'live.com', 'msn.com',
        'mail.com', 'ymail.com', 'protonmail.com', 'zoho.com',
        'rediffmail.com', 'yahoo.co.in', 'gmail.co.in'
    }
    
    return domain not in personal_domains
