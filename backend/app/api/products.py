from __future__ import annotations

import uuid
from typing import Sequence

from fastapi import APIRouter, Depends, HTTPException, UploadFile, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.models import PriceHistory, Product
from app.schemas.common import ProductCreate, ProductRead
from app.services.catalog_ingestion import CatalogIngestionService

router = APIRouter(prefix="/products", tags=["products"])


@router.get("/", response_model=list[ProductRead])
async def list_products(db: AsyncSession = Depends(get_db)) -> Sequence[Product]:
    result = await db.execute(select(Product))
    return result.scalars().all()


@router.post("/", response_model=ProductRead, status_code=status.HTTP_201_CREATED)
async def create_product(payload: ProductCreate, db: AsyncSession = Depends(get_db)) -> Product:
    product_id = payload.id or str(uuid.uuid4())
    product = Product(
        id=product_id,
        supplier_id=payload.supplier_id,
        sku=payload.sku,
        upc=payload.upc,
        gtin=payload.gtin,
        name=payload.name,
        unit=payload.unit,
        package_size=payload.package_size,
        price=payload.price,
        currency=payload.currency,
    )
    db.add(product)
    db.add(
        PriceHistory(
            id=str(uuid.uuid4()),
            product_id=product_id,
            supplier_id=payload.supplier_id,
            price=payload.price,
            currency=payload.currency,
        )
    )
    await db.commit()
    await db.refresh(product)
    return product


@router.post("/upload", status_code=status.HTTP_202_ACCEPTED)
async def upload_catalog(
    supplier_id: str,
    file: UploadFile,
    db: AsyncSession = Depends(get_db),
) -> dict[str, str]:
    service = CatalogIngestionService(db)
    try:
        await service.handle_upload(supplier_id=supplier_id, file=file)
    except NotImplementedError as exc:  # pragma: no cover - placeholder until implemented
        raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED, detail=str(exc)) from exc
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
    return {"message": "Catalog queued for processing"}


@router.get("/{product_id}", response_model=ProductRead)
async def get_product(product_id: str, db: AsyncSession = Depends(get_db)) -> Product:
    result = await db.execute(select(Product).where(Product.id == product_id))
    product = result.scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product
