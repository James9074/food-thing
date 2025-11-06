from functools import lru_cache
from pydantic import BaseSettings, AnyUrl


class Settings(BaseSettings):
    app_name: str = "Food Thing"
    database_url: str = "sqlite+aiosqlite:///./app.db"
    celery_broker_url: str = "redis://localhost:6379/0"
    celery_result_backend: str = "redis://localhost:6379/1"
    s3_endpoint_url: AnyUrl | None = None
    s3_bucket_name: str | None = None
    usda_api_key: str | None = None

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache
def get_settings() -> Settings:
    return Settings()
