from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class ShoppingItemCreate(BaseModel):
    name: str
    category: str


class ShoppingItemUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    is_done: Optional[bool] = None


class ShoppingItemResponse(BaseModel):
    id: UUID
    name: str
    category: str
    is_done: bool
    created_at: datetime

    model_config = {
        "from_attributes": True
    }
