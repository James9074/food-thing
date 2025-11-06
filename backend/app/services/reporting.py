from __future__ import annotations

from dataclasses import dataclass
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import PriceHistory


@dataclass
class PriceTrend:
    product_id: str
    average_price: float
    change_percent: float


class ReportingService:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def price_trends(self, supplier_id: str | None = None) -> list[PriceTrend]:
        stmt = select(
            PriceHistory.product_id,
            func.avg(PriceHistory.price).label("avg_price"),
        ).group_by(PriceHistory.product_id)
        if supplier_id:
            stmt = stmt.where(PriceHistory.supplier_id == supplier_id)
        result = await self.db.execute(stmt)
        trends: list[PriceTrend] = []
        for product_id, avg_price in result:
            latest_price = await self._latest_price(product_id)
            if latest_price is None:
                continue
            change = ((latest_price - avg_price) / avg_price) * 100 if avg_price else 0.0
            trends.append(PriceTrend(product_id=product_id, average_price=float(avg_price), change_percent=change))
        return trends

    async def _latest_price(self, product_id: str) -> float | None:
        result = await self.db.execute(
            select(PriceHistory.price)
            .where(PriceHistory.product_id == product_id)
            .order_by(PriceHistory.recorded_at.desc())
        )
        price = result.scalar_one_or_none()
        return float(price) if price is not None else None
