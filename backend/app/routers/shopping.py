from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import ShoppingItem
from app.schemas import (
    ShoppingItemCreate,
    ShoppingItemResponse,
    ShoppingItemUpdate,
)

router = APIRouter()


@router.get("/items", response_model=list[ShoppingItemResponse])
def get_shopping_items(db: Session = Depends(get_db)):
    return db.query(ShoppingItem).order_by(ShoppingItem.created_at.desc()).all()


@router.post("/items", response_model=ShoppingItemResponse)
def create_shopping_item(
    item: ShoppingItemCreate,
    db: Session = Depends(get_db)
):
    new_item = ShoppingItem(
        name=item.name,
        category=item.category,
        is_done=False
    )

    db.add(new_item)
    db.commit()
    db.refresh(new_item)

    return new_item


@router.patch("/items/{item_id}", response_model=ShoppingItemResponse)
def update_shopping_item(
    item_id: UUID,
    item_update: ShoppingItemUpdate,
    db: Session = Depends(get_db)
):
    item = db.query(ShoppingItem).filter(ShoppingItem.id == item_id).first()

    if item is None:
        raise HTTPException(status_code=404, detail="Shopping item not found")

    update_data = item_update.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(item, field, value)

    db.commit()
    db.refresh(item)

    return item


@router.delete("/items/{item_id}")
def delete_shopping_item(
    item_id: UUID,
    db: Session = Depends(get_db)
):
    item = db.query(ShoppingItem).filter(ShoppingItem.id == item_id).first()

    if item is None:
        raise HTTPException(status_code=404, detail="Shopping item not found")

    db.delete(item)
    db.commit()

    return {"message": "Shopping item deleted successfully"}


@router.get("/categories")
def get_shopping_categories():
    return [
        "Groceries",
        "Household",
        "Electronics",
        "Health",
        "Other"
    ]
