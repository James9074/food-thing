from __future__ import annotations

from datetime import datetime
from typing import Any, List, Optional

from pydantic import BaseModel


class RecipeIngredientInput(BaseModel):
    ingredient_id: str
    quantity: float
    unit: str
    notes: Optional[str] = None

    class Config:
        orm_mode = True


class RecipeBase(BaseModel):
    name: str
    category: Optional[str] = None
    season: Optional[str] = None
    dietary_flags: Optional[dict[str, Any]] = None
    instructions: Optional[list[dict[str, Any]]] = None
    storage_guidelines: Optional[list[dict[str, Any]]] = None


class RecipeCreate(RecipeBase):
    id: str | None = None
    ingredients: List[RecipeIngredientInput]


class RecipeRead(RecipeBase):
    id: str
    created_at: datetime
    ingredients: List[RecipeIngredientInput]

    class Config:
        orm_mode = True
