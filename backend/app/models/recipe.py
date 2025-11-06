from __future__ import annotations

from sqlalchemy import Column, DateTime, JSON, String, func
from sqlalchemy.orm import relationship

from app.db.base import Base


class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(String(36), primary_key=True)
    name = Column(String(255), nullable=False)
    category = Column(String(100), nullable=True)
    season = Column(String(50), nullable=True)
    dietary_flags = Column(JSON, nullable=True)
    instructions = Column(JSON, nullable=True)
    storage_guidelines = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    ingredients = relationship("RecipeIngredient", back_populates="recipe", cascade="all, delete-orphan")
