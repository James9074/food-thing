from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.models import Ingredient
from app.schemas.common import IngredientCreate, IngredientRead

router = APIRouter(prefix="/ingredients", tags=["ingredients"])


@router.get("/", response_model=list[IngredientRead])
async def list_ingredients(db: AsyncSession = Depends(get_db)) -> list[Ingredient]:
    result = await db.execute(select(Ingredient))
    return result.scalars().all()


@router.post("/", response_model=IngredientRead, status_code=status.HTTP_201_CREATED)
async def create_ingredient(payload: IngredientCreate, db: AsyncSession = Depends(get_db)) -> Ingredient:
    ingredient_id = payload.id or str(uuid.uuid4())
    ingredient = Ingredient(
        id=ingredient_id,
        name=payload.name,
        fndds_code=payload.fndds_code,
        ndb_number=payload.ndb_number,
        nutritional_profile=payload.nutritional_profile,
        allergen_flags=payload.allergen_flags,
    )
    db.add(ingredient)
    await db.commit()
    await db.refresh(ingredient)
    return ingredient


@router.get("/{ingredient_id}", response_model=IngredientRead)
async def get_ingredient(ingredient_id: str, db: AsyncSession = Depends(get_db)) -> Ingredient:
    result = await db.execute(select(Ingredient).where(Ingredient.id == ingredient_id))
    ingredient = result.scalar_one_or_none()
    if not ingredient:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ingredient not found")
    return ingredient
