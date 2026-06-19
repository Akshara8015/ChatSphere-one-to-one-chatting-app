from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.database import get_db
from app.models.user import User
from app.models.message import Message
from app.utils.dependencies import get_current_user

router = APIRouter()


@router.get("/")
def get_chats(db: Session = Depends(get_db),current_user=Depends(get_current_user)):
    my_id = current_user["user_id"]
    messages = db.query(Message).filter(or_(
            Message.sender_id == my_id,
            Message.receiver_id == my_id
        )).all()

    chat_user_ids = set()
    for message in messages:
        if message.sender_id == my_id:
            chat_user_ids.add(message.receiver_id)

        else:
            chat_user_ids.add(message.sender_id)

    users = db.query(User).filter(User.id.in_(chat_user_ids)).all()

    return [{
            "user_id": user.id,
            "username": user.username
        }for user in users]

