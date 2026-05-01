from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

# --- Role Schemas ---
class RoleBase(BaseModel):
    role_name: str

class RoleCreate(RoleBase):
    pass

class RoleResponse(RoleBase):
    role_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Notification Schemas ---
class NotificationBase(BaseModel):
    user_id: int
    title: str
    message: str
    is_read: Optional[bool] = False

class NotificationCreate(NotificationBase):
    pass

class NotificationUpdate(BaseModel):
    title: Optional[str] = None
    message: Optional[str] = None
    is_read: Optional[bool] = None

class NotificationResponse(NotificationBase):
    notification_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Admin Log Schemas ---
class AdminLogBase(BaseModel):
    admin_id: int
    action_type: str
    target_table: Optional[str] = None
    target_id: Optional[int] = None
    remarks: Optional[str] = None

class AdminLogCreate(AdminLogBase):
    pass

class AdminLogResponse(AdminLogBase):
    log_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- System Setting Schemas ---
class SystemSettingBase(BaseModel):
    setting_key: str
    setting_value: Optional[str] = None

class SystemSettingCreate(SystemSettingBase):
    pass

class SystemSettingUpdate(BaseModel):
    setting_value: Optional[str] = None

class SystemSettingResponse(SystemSettingBase):
    setting_id: int
    updated_at: datetime

    class Config:
        from_attributes = True
