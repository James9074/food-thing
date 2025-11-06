from __future__ import annotations

from sqlalchemy import Column, ForeignKey, Numeric, String
from sqlalchemy.orm import relationship

from app.db.base import Base


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(String(36), primary_key=True)
    order_id = Column(String(36), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(String(36), ForeignKey("products.id", ondelete="SET NULL"), nullable=True)
    quantity = Column(Numeric(12, 4), nullable=False)
    unit = Column(String(25), nullable=False)
    price_each = Column(Numeric(12, 4), nullable=True)

    order = relationship("Order", back_populates="items")
    product = relationship("Product")
