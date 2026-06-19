from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import Query

from app.database import get_db
from app.models.user import User
from app.websocket_manager import manager
from app.utils.dependencies import get_current_user

router = APIRouter()

@router.get("/")
def get_users(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    users = db.query(User).filter(User.id != current_user["user_id"]).all()

    return [{
            "id": user.id,
            "username": user.username
        }
        for user in users]

@router.get("/search")
def search_users( query: str = Query(...), db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    users = db.query(User).filter(User.username.ilike(f"%{query}%"), User.id != current_user["user_id"]).all()
    return users

@router.get("/online")
def get_online_users():
    return {"online_users":manager.get_online_users()}

