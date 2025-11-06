from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.models import Order, OrderItem, Supplier
from app.schemas.order import OrderCreate, OrderRead

router = APIRouter(prefix="/orders", tags=["orders"])


@router.get("/", response_model=list[OrderRead])
async def list_orders(db: AsyncSession = Depends(get_db)) -> list[Order]:
    result = await db.execute(select(Order))
    orders = result.scalars().all()
    for order in orders:
        await db.refresh(order, attribute_names=["items"])
    return orders


@router.post("/", response_model=OrderRead, status_code=status.HTTP_201_CREATED)
async def create_order(payload: OrderCreate, db: AsyncSession = Depends(get_db)) -> Order:
    if payload.supplier_id:
        await _ensure_supplier_exists(db, payload.supplier_id)
    order_id = payload.id or str(uuid.uuid4())
    order = Order(
        id=order_id,
        supplier_id=payload.supplier_id,
        status=payload.status,
        scheduled_date=payload.scheduled_date,
        order_metadata=payload.metadata,
    )
    db.add(order)
    for item in payload.items:
        db.add(
            OrderItem(
                id=str(uuid.uuid4()),
                order_id=order_id,
                product_id=item.product_id,
                quantity=item.quantity,
                unit=item.unit,
                price_each=item.price_each,
            )
        )
    await db.commit()
    await db.refresh(order)
    await db.refresh(order, attribute_names=["items"])
    return order


@router.get("/{order_id}", response_model=OrderRead)
async def get_order(order_id: str, db: AsyncSession = Depends(get_db)) -> Order:
    result = await db.execute(select(Order).where(Order.id == order_id))
    order = result.scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    await db.refresh(order, attribute_names=["items"])
    return order


async def _ensure_supplier_exists(db: AsyncSession, supplier_id: str) -> None:
    result = await db.execute(select(Supplier).where(Supplier.id == supplier_id))
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Supplier not found")
