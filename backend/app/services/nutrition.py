from __future__ import annotations

from dataclasses import dataclass
import uuid
from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Ingredient, Product, ProductIngredientMapping


@dataclass
class NutritionMatch:
    product_id: str
    ingredient_id: str
    confidence: float


class NutritionMatchingService:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def match_product(self, product: Product) -> Optional[NutritionMatch]:
        ingredients = await self._search_ingredients(product.name)
        if not ingredients:
            return None
        best = max(ingredients, key=lambda candidate: candidate[1])
        ingredient, confidence = best
        mapping = ProductIngredientMapping(
            id=str(uuid.uuid4()),
            product_id=product.id,
            ingredient_id=ingredient.id,
            confidence_score=confidence,
        )
        self.db.add(mapping)
        await self.db.commit()
        return NutritionMatch(product.id, ingredient.id, confidence)

    async def _search_ingredients(self, query: str) -> list[tuple[Ingredient, float]]:
        result = await self.db.execute(select(Ingredient))
        matches: list[tuple[Ingredient, float]] = []
        for ingredient in result.scalars():
            confidence = self._score(query, ingredient.name)
            if confidence > 0.4:
                matches.append((ingredient, confidence))
        return matches

    def _score(self, query: str, candidate: str) -> float:
        query_tokens = set(query.lower().split())
        candidate_tokens = set(candidate.lower().split())
        overlap = query_tokens & candidate_tokens
        if not overlap:
            return 0.0
        return len(overlap) / max(len(query_tokens), len(candidate_tokens))
