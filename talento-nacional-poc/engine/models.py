from sqlalchemy import Column, String, TIMESTAMP, text
from sqlalchemy.dialects.postgresql import UUID, JSONB
from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any
from db import Base
import uuid
from datetime import datetime

# --- SQLAlchemy Models ---
class EmployeeDB(Base):
    __tablename__ = "employees"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    role = Column(String, nullable=True)
    status = Column(String, default="pending")  # pending, completed
    assessment_data = Column(JSONB, default={})
    created_at = Column(TIMESTAMP(timezone=True), server_default=text("now()"))

# --- Pydantic Schemas ---
class EmployeeBase(BaseModel):
    name: str
    email: EmailStr
    role: Optional[str] = None

class EmployeeCreate(EmployeeBase):
    pass

class Employee(EmployeeBase):
    id: uuid.UUID
    status: str
    assessment_data: Dict[str, Any] = {}
    created_at: datetime

    class Config:
        from_attributes = True
