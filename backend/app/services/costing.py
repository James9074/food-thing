from __future__ import annotations

from dataclasses import dataclass

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import PriceHistory, Product, ProductIngredientMapping, Recipe, RecipeIngredient


@dataclass
class RecipeCostBreakdown:
    total_cost: float
    ingredient_costs: dict[str, float]


class CostingService:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def recipe_cost(self, recipe_id: str) -> RecipeCostBreakdown:
        recipe = await self._get_recipe(recipe_id)
        ingredient_costs: dict[str, float] = {}
        total = 0.0
        for entry in recipe.ingredients:
            cost = await self._ingredient_cost(entry)
            ingredient_costs[entry.ingredient_id] = cost
            total += cost
        return RecipeCostBreakdown(total_cost=total, ingredient_costs=ingredient_costs)

    async def _get_recipe(self, recipe_id: str) -> Recipe:
        result = await self.db.execute(select(Recipe).where(Recipe.id == recipe_id))
        recipe = result.scalar_one()
        await self._prefetch_ingredients(recipe)
        return recipe

    async def _prefetch_ingredients(self, recipe: Recipe) -> None:
        for entry in recipe.ingredients:
            await self.db.refresh(entry, attribute_names=["ingredient"])

    async def _ingredient_cost(self, entry: RecipeIngredient) -> float:
        result = await self.db.execute(
            select(Product)
            .join(ProductIngredientMapping)
            .where(ProductIngredientMapping.ingredient_id == entry.ingredient_id)
        )
        product = result.scalar_one_or_none()
        if product:
            return float(product.price) * float(entry.quantity)
        price_result = await self.db.execute(
            select(PriceHistory)
            .join(Product)
            .join(ProductIngredientMapping)
            .where(ProductIngredientMapping.ingredient_id == entry.ingredient_id)
            .order_by(PriceHistory.recorded_at.desc())
        )
        price = price_result.scalar_one_or_none()
        return float(price.price) * float(entry.quantity) if price else 0.0
