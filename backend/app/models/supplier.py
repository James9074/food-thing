from __future__ import annotations

from sqlalchemy import Column, DateTime, JSON, String, func

from app.db.base import Base


class Supplier(Base):
    __tablename__ = "suppliers"

    id = Column(String(36), primary_key=True)
    name = Column(String(255), nullable=False, unique=True)
    contact = Column(JSON, nullable=True)
    api_credentials = Column(JSON, nullable=True)
    catalog_format = Column(String(50), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
