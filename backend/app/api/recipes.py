from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.models import Ingredient, Recipe, RecipeIngredient
from app.schemas.recipe import RecipeCreate, RecipeRead
from app.services.costing import CostingService

router = APIRouter(prefix="/recipes", tags=["recipes"])


@router.get("/", response_model=list[RecipeRead])
async def list_recipes(db: AsyncSession = Depends(get_db)) -> list[Recipe]:
    result = await db.execute(select(Recipe))
    recipes = result.scalars().all()
    for recipe in recipes:
        await db.refresh(recipe, attribute_names=["ingredients"])
    return recipes


@router.post("/", response_model=RecipeRead, status_code=status.HTTP_201_CREATED)
async def create_recipe(payload: RecipeCreate, db: AsyncSession = Depends(get_db)) -> Recipe:
    recipe_id = payload.id or str(uuid.uuid4())
    recipe = Recipe(
        id=recipe_id,
        name=payload.name,
        category=payload.category,
        season=payload.season,
        dietary_flags=payload.dietary_flags,
        instructions=payload.instructions,
        storage_guidelines=payload.storage_guidelines,
    )
    db.add(recipe)
    for item in payload.ingredients:
        await _ensure_ingredient_exists(db, item.ingredient_id)
        db.add(
            RecipeIngredient(
                id=str(uuid.uuid4()),
                recipe_id=recipe_id,
                ingredient_id=item.ingredient_id,
                quantity=item.quantity,
                unit=item.unit,
                notes=item.notes,
            )
        )
    await db.commit()
    await db.refresh(recipe)
    await db.refresh(recipe, attribute_names=["ingredients"])
    return recipe


@router.get("/{recipe_id}", response_model=RecipeRead)
async def get_recipe(recipe_id: str, db: AsyncSession = Depends(get_db)) -> Recipe:
    result = await db.execute(select(Recipe).where(Recipe.id == recipe_id))
    recipe = result.scalar_one_or_none()
    if not recipe:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Recipe not found")
    await db.refresh(recipe, attribute_names=["ingredients"])
    return recipe


@router.get("/{recipe_id}/cost")
async def recipe_cost(recipe_id: str, db: AsyncSession = Depends(get_db)) -> dict[str, float]:
    service = CostingService(db)
    breakdown = await service.recipe_cost(recipe_id)
    return {"total_cost": breakdown.total_cost, "ingredient_costs": breakdown.ingredient_costs}


async def _ensure_ingredient_exists(db: AsyncSession, ingredient_id: str) -> None:
    result = await db.execute(select(Ingredient).where(Ingredient.id == ingredient_id))
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Ingredient not found")
