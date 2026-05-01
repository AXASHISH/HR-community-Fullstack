from sqlalchemy import Column, Integer, String, DateTime, Boolean, Text, ForeignKey, func
from sqlalchemy.orm import relationship
from app.db.session import Base
from datetime import datetime

class Role(Base):
    __tablename__ = "roles"
    role_id = Column(Integer, primary_key=True, autoincrement=True)
    role_name = Column(String(255), unique=True, nullable=False)
    created_at = Column(DateTime, default=func.now())

class Notification(Base):
    __tablename__ = "notifications"
    notification_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('hr_community_users.user_id', ondelete='CASCADE'), nullable=False)
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=func.now())
    
    # Relationship with User
    user = relationship("HRCommunityUser", backref="notifications")

class AdminLog(Base):
    __tablename__ = "admin_logs"
    log_id = Column(Integer, primary_key=True, autoincrement=True)
    admin_id = Column(Integer, ForeignKey('hr_community_users.user_id', ondelete='CASCADE'), nullable=False)
    action_type = Column(String(100), nullable=False)
    target_table = Column(String(100), nullable=True)
    target_id = Column(Integer, nullable=True)
    remarks = Column(Text, nullable=True)
    created_at = Column(DateTime, default=func.now())
    
    # Relationship with Admin (User)
    admin = relationship("HRCommunityUser", backref="admin_logs")

class SystemSetting(Base):
    __tablename__ = "system_settings"
    setting_id = Column(Integer, primary_key=True, autoincrement=True)
    setting_key = Column(String(100), unique=True, nullable=False)
    setting_value = Column(Text, nullable=True)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
