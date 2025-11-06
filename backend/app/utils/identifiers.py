from __future__ import annotations

import re
from typing import Iterable


GTIN_12_PATTERN = re.compile(r"^\d{12}$")
GTIN_13_PATTERN = re.compile(r"^\d{13}$")
GTIN_14_PATTERN = re.compile(r"^\d{14}$")


def calculate_check_digit(number: str) -> int:
    """Return the GTIN/UPC check digit."""
    digits = [int(d) for d in number]
    total = 0
    for index, digit in enumerate(reversed(digits), start=1):
        total += digit * 3 if index % 2 == 1 else digit
    return (10 - (total % 10)) % 10


def validate_gtin(value: str) -> bool:
    value = value.strip()
    if len(value) not in {12, 13, 14} or not value.isdigit():
        return False
    check_digit = int(value[-1])
    return calculate_check_digit(value[:-1]) == check_digit


def normalize_gtin(value: str) -> str:
    value = re.sub(r"\D", "", value)
    if len(value) == 12:
        return value
    if len(value) == 13:
        return value
    if len(value) == 14:
        return value
    raise ValueError("Unsupported GTIN length")


def generate_barcode_payload(identifier: str) -> str:
    if not identifier.isdigit():
        raise ValueError("Identifier must be numeric")
    return identifier.zfill(14)


def detect_identifier_type(identifier: str) -> str:
    cleaned = re.sub(r"\D", "", identifier)
    if GTIN_12_PATTERN.match(cleaned):
        return "upc"
    if GTIN_13_PATTERN.match(cleaned):
        return "gtin13"
    if GTIN_14_PATTERN.match(cleaned):
        return "gtin14"
    return "sku"
