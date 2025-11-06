from __future__ import annotations

from sqlalchemy import Column, DateTime, ForeignKey, JSON, String, func
from sqlalchemy.orm import relationship

from app.db.base import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(String(36), primary_key=True)
    supplier_id = Column(String(36), ForeignKey("suppliers.id", ondelete="SET NULL"), nullable=True)
    status = Column(String(50), nullable=False, default="pending")
    scheduled_date = Column(DateTime(timezone=True), nullable=True)
    order_metadata = Column("metadata", JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    supplier = relationship("Supplier")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
