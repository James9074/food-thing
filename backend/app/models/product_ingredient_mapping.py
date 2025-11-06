from __future__ import annotations

from sqlalchemy import Column, ForeignKey, Numeric, String
from sqlalchemy.orm import relationship

from app.db.base import Base


class ProductIngredientMapping(Base):
    __tablename__ = "product_ingredient_mappings"

    id = Column(String(36), primary_key=True)
    product_id = Column(String(36), ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    ingredient_id = Column(String(36), ForeignKey("ingredients.id", ondelete="CASCADE"), nullable=False)
    confidence_score = Column(Numeric(5, 4), nullable=False)
    notes = Column(String(255), nullable=True)

    product = relationship("Product", back_populates="ingredient_mappings")
    ingredient = relationship("Ingredient", back_populates="product_mappings")
