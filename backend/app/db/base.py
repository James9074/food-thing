from sqlalchemy.orm import declarative_base

Base = declarative_base()

# Import models for metadata registration
from app import models  # noqa: E402,F401
