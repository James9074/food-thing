from __future__ import annotations

from datetime import datetime
from typing import Any, Optional

from pydantic import BaseModel, Field


class SupplierBase(BaseModel):
    name: str
    contact: Optional[dict[str, Any]] = None
    api_credentials: Optional[dict[str, Any]] = None
    catalog_format: Optional[str] = None


class SupplierCreate(SupplierBase):
    id: str | None = Field(default=None, description="UUID assigned by the client or server")


class SupplierRead(SupplierBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True


class ProductBase(BaseModel):
    supplier_id: str
    sku: str
    upc: str | None = None
    gtin: str | None = None
    name: str
    unit: str
    package_size: str | None = None
    price: float
    currency: str = "USD"


class ProductCreate(ProductBase):
    id: str | None = None


class ProductRead(ProductBase):
    id: str
    last_updated: datetime

    class Config:
        orm_mode = True


class IngredientBase(BaseModel):
    name: str
    fndds_code: str | None = None
    ndb_number: str | None = None
    nutritional_profile: dict[str, Any] | None = None
    allergen_flags: dict[str, Any] | None = None


class IngredientCreate(IngredientBase):
    id: str | None = None


class IngredientRead(IngredientBase):
    id: str
    created_at: datetime

    class Config:
        orm_mode = True
