from __future__ import annotations

from sqlalchemy import Column, DateTime, JSON, String, func
from sqlalchemy.orm import relationship

from app.db.base import Base


class Ingredient(Base):
    __tablename__ = "ingredients"

    id = Column(String(36), primary_key=True)
    name = Column(String(255), nullable=False, unique=True)
    fndds_code = Column(String(8), nullable=True)
    ndb_number = Column(String(5), nullable=True)
    nutritional_profile = Column(JSON, nullable=True)
    allergen_flags = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    product_mappings = relationship("ProductIngredientMapping", back_populates="ingredient")
    recipe_ingredients = relationship("RecipeIngredient", back_populates="ingredient")
