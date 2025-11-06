from __future__ import annotations

from sqlalchemy import Column, DateTime, ForeignKey, Numeric, String, func
from sqlalchemy.orm import relationship

from app.db.base import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(String(36), primary_key=True)
    supplier_id = Column(String(36), ForeignKey("suppliers.id", ondelete="CASCADE"), nullable=False)
    sku = Column(String(100), nullable=False)
    upc = Column(String(14), nullable=True)
    gtin = Column(String(14), nullable=True)
    name = Column(String(255), nullable=False)
    unit = Column(String(50), nullable=False)
    package_size = Column(String(50), nullable=True)
    price = Column(Numeric(12, 4), nullable=False)
    currency = Column(String(3), nullable=False, default="USD")
    last_updated = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
    )

    supplier = relationship("Supplier", backref="products")
    price_history = relationship("PriceHistory", back_populates="product", cascade="all, delete-orphan")
    ingredient_mappings = relationship(
        "ProductIngredientMapping", back_populates="product", cascade="all, delete-orphan"
    )
