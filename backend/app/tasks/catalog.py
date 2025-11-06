from __future__ import annotations

import logging

from celery import Celery

from app.core.config import get_settings

settings = get_settings()

celery_app = Celery(
    "catalog_tasks",
    broker=settings.celery_broker_url,
    backend=settings.celery_result_backend,
)


@celery_app.task(name="catalog.process")
def process_catalog(supplier_id: str, object_key: str) -> None:
    logging.info("Processing catalog", extra={"supplier_id": supplier_id, "object_key": object_key})
    # Placeholder for actual parsing and persistence logic.
