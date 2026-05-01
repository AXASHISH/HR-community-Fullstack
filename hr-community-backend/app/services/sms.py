import requests
from app.core.config import settings

def send_phone_otp(phone: str, otp: str) -> bool:
    """Send SMS OTP using Powerstext API"""
    message = (
        f"Hi User, your EduSkills OTP is {otp}. "
        f"Use it to verify your portal access safely."
    )

    url = (
        f"{settings.SMS_API_URL}"
        f"?authentic-key={settings.SMS_AUTH_TOKEN}"
        "&senderid=EDSKIL"
        "&route=1"
        f"&number={phone}"
        f"&message={message}"
        f"&templateid={settings.SMS_TEMPLATE_ID}"
    )

    try:
        response = requests.post(url, timeout=10)
        return response.status_code == 200
    except Exception:
        return False
