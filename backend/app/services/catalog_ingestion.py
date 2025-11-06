from __future__ import annotations

import csv
import io
import uuid
from dataclasses import dataclass
from typing import Iterable

from fastapi import UploadFile
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import PriceHistory, Product, Supplier
from app.utils.identifiers import detect_identifier_type, validate_gtin


@dataclass
class CatalogProduct:
    name: str
    price: float
    unit: str
    sku: str
    upc: str | None = None
    gtin: str | None = None
    package_size: str | None = None
    currency: str = "USD"


class CatalogIngestionService:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def handle_upload(self, supplier_id: str, file: UploadFile) -> None:
        supplier = await self._get_supplier(supplier_id)
        if supplier is None:
            raise ValueError("Supplier not found")
        content = await file.read()
        extension = file.filename.split(".")[-1].lower()
        products = self._parse_content(extension, content)
        await self._persist_products(supplier_id, products)

    async def _get_supplier(self, supplier_id: str) -> Supplier | None:
        result = await self.db.execute(select(Supplier).where(Supplier.id == supplier_id))
        return result.scalar_one_or_none()

    def _parse_content(self, extension: str, content: bytes) -> Iterable[CatalogProduct]:
        if extension in {"csv", "tsv"}:
            return list(self._parse_csv(content, delimiter="," if extension == "csv" else "\t"))
        if extension in {"xls", "xlsx"}:
            # Placeholder: real implementation would use openpyxl or pandas
            raise NotImplementedError("Excel parsing not yet implemented")
        if extension == "pdf":
            raise NotImplementedError("PDF parsing with OCR not yet implemented")
        raise ValueError(f"Unsupported catalog format: {extension}")

    def _parse_csv(self, content: bytes, delimiter: str) -> Iterable[CatalogProduct]:
        decoded = content.decode("utf-8")
        reader = csv.DictReader(io.StringIO(decoded), delimiter=delimiter)
        for row in reader:
            name = row.get("name") or row.get("product") or row.get("description")
            if not name:
                continue
            price_str = (row.get("price") or row.get("cost") or "0").strip()
            price = self._normalize_price(price_str)
            sku = row.get("sku") or row.get("item_number") or str(uuid.uuid4())
            unit = row.get("unit") or "ea"
            identifier = row.get("upc") or row.get("gtin")
            upc = None
            gtin = None
            if identifier:
                id_type = detect_identifier_type(identifier)
                if id_type == "upc" and validate_gtin(identifier):
                    upc = identifier
                elif id_type in {"gtin13", "gtin14"} and validate_gtin(identifier):
                    gtin = identifier
            yield CatalogProduct(
                name=name.strip(),
                price=price,
                unit=unit,
                sku=sku,
                upc=upc,
                gtin=gtin,
                package_size=row.get("package_size"),
            )

    async def _persist_products(self, supplier_id: str, products: Iterable[CatalogProduct]) -> None:
        for product in products:
            product_id = str(uuid.uuid4())
            db_product = Product(
                id=product_id,
                supplier_id=supplier_id,
                sku=product.sku,
                name=product.name,
                unit=product.unit,
                package_size=product.package_size,
                price=product.price,
                currency=product.currency,
                upc=product.upc,
                gtin=product.gtin,
            )
            self.db.add(db_product)
            self.db.add(
                PriceHistory(
                    id=str(uuid.uuid4()),
                    product_id=product_id,
                    supplier_id=supplier_id,
                    price=product.price,
                    currency=product.currency,
                    is_bulk="bulk" if product.package_size else None,
                )
            )
        await self.db.commit()

    def _normalize_price(self, value: str) -> float:
        cleaned = value.replace(",", "")
        if "/" in cleaned and "$" in cleaned:
            # handle formats like "2/$5"
            try:
                quantity_part, price_part = cleaned.split("/")
                quantity = float(quantity_part)
                price = float(price_part.replace("$", ""))
                return price / quantity if quantity else price
            except (ValueError, ZeroDivisionError):
                pass
        cleaned = cleaned.replace("$", "")
        try:
            return float(cleaned)
        except ValueError as exc:
            raise ValueError(f"Unable to parse price value '{value}'") from exc
