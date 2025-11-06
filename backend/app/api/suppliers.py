from __future__ import annotations

import uuid
from typing import Sequence

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.models import Supplier
from app.schemas.common import SupplierCreate, SupplierRead

router = APIRouter(prefix="/suppliers", tags=["suppliers"])


@router.get("/", response_model=list[SupplierRead])
async def list_suppliers(db: AsyncSession = Depends(get_db)) -> Sequence[Supplier]:
    result = await db.execute(select(Supplier))
    return result.scalars().all()


@router.post("/", response_model=SupplierRead, status_code=status.HTTP_201_CREATED)
async def create_supplier(payload: SupplierCreate, db: AsyncSession = Depends(get_db)) -> Supplier:
    supplier_id = payload.id or str(uuid.uuid4())
    supplier = Supplier(
        id=supplier_id,
        name=payload.name,
        contact=payload.contact,
        api_credentials=payload.api_credentials,
        catalog_format=payload.catalog_format,
    )
    db.add(supplier)
    await db.commit()
    await db.refresh(supplier)
    return supplier


@router.get("/{supplier_id}", response_model=SupplierRead)
async def get_supplier(supplier_id: str, db: AsyncSession = Depends(get_db)) -> Supplier:
    result = await db.execute(select(Supplier).where(Supplier.id == supplier_id))
    supplier = result.scalar_one_or_none()
    if not supplier:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Supplier not found")
    return supplier


@router.put("/{supplier_id}", response_model=SupplierRead)
async def update_supplier(
    supplier_id: str, payload: SupplierCreate, db: AsyncSession = Depends(get_db)
) -> Supplier:
    result = await db.execute(select(Supplier).where(Supplier.id == supplier_id))
    supplier = result.scalar_one_or_none()
    if not supplier:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Supplier not found")
    supplier.name = payload.name
    supplier.contact = payload.contact
    supplier.api_credentials = payload.api_credentials
    supplier.catalog_format = payload.catalog_format
    await db.commit()
    await db.refresh(supplier)
    return supplier


@router.delete("/{supplier_id}", status_code=status.HTTP_204_NO_CONTENT, response_model=None)
async def delete_supplier(supplier_id: str, db: AsyncSession = Depends(get_db)) -> None:
    result = await db.execute(select(Supplier).where(Supplier.id == supplier_id))
    supplier = result.scalar_one_or_none()
    if not supplier:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Supplier not found")
    await db.delete(supplier)
    await db.commit()
