from __future__ import annotations

from sqlalchemy import Column, ForeignKey, Numeric, String
from sqlalchemy.orm import relationship

from app.db.base import Base


class RecipeIngredient(Base):
    __tablename__ = "recipe_ingredients"

    id = Column(String(36), primary_key=True)
    recipe_id = Column(String(36), ForeignKey("recipes.id", ondelete="CASCADE"), nullable=False)
    ingredient_id = Column(String(36), ForeignKey("ingredients.id", ondelete="CASCADE"), nullable=False)
    quantity = Column(Numeric(12, 4), nullable=False)
    unit = Column(String(25), nullable=False)
    notes = Column(String(255), nullable=True)

    recipe = relationship("Recipe", back_populates="ingredients")
    ingredient = relationship("Ingredient", back_populates="recipe_ingredients")
