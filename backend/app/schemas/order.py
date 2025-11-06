from __future__ import annotations

from datetime import datetime
from typing import Any, List, Optional

from pydantic import BaseModel


class OrderItemInput(BaseModel):
    product_id: Optional[str] = None
    quantity: float
    unit: str
    price_each: Optional[float] = None


class OrderBase(BaseModel):
    supplier_id: Optional[str] = None
    status: str = "pending"
    scheduled_date: Optional[datetime] = None
    metadata: Optional[dict[str, Any]] = None


class OrderCreate(OrderBase):
    id: str | None = None
    items: List[OrderItemInput]


class OrderRead(OrderBase):
    id: str
    created_at: datetime
    items: List[OrderItemInput]

    class Config:
        orm_mode = True
        fields = {"metadata": "order_metadata"}
