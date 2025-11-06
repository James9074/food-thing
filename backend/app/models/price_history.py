from __future__ import annotations

from sqlalchemy import Column, DateTime, ForeignKey, Numeric, String, func
from sqlalchemy.orm import relationship

from app.db.base import Base


class PriceHistory(Base):
    __tablename__ = "price_history"

    id = Column(String(36), primary_key=True)
    product_id = Column(String(36), ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    supplier_id = Column(String(36), ForeignKey("suppliers.id", ondelete="SET NULL"), nullable=True)
    price = Column(Numeric(12, 4), nullable=False)
    currency = Column(String(3), nullable=False, default="USD")
    recorded_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    is_bulk = Column(String(10), nullable=True)

    product = relationship("Product", back_populates="price_history")
    supplier = relationship("Supplier")
