from __future__ import annotations

from fastapi import FastAPI

from app.api import ingredients, orders, products, recipes, suppliers
from app.core.config import get_settings

settings = get_settings()

app = FastAPI(title=settings.app_name)
app.include_router(suppliers.router)
app.include_router(products.router)
app.include_router(ingredients.router)
app.include_router(recipes.router)
app.include_router(orders.router)


@app.get("/healthz")
def healthcheck() -> dict[str, str]:
    return {"status": "ok"}
