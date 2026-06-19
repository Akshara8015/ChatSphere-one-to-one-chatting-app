from fastapi import APIRouter
from fastapi import Depends
from typing import List

from sqlalchemy import and_
from sqlalchemy import or_
from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.user import User
from app.database import get_db
from app.models.message import Message
from app.schemas.message import MessageResponse
from app.schemas.message import SendMessageRequest
from app.utils.dependencies import get_current_user


router = APIRouter()

@router.post("/", response_model=MessageResponse)
def send_message(request: SendMessageRequest, db: Session = Depends(get_db), current_user=Depends(get_current_user)):

    sender_id = current_user["user_id"]
    receiver = db.query(User).filter(User.id == request.receiver_id).first()

    if not receiver:
        raise HTTPException(
            status_code=404,
            detail="Receiver not found"
        )

    if sender_id == request.receiver_id:
        raise HTTPException(
            status_code=400,
            detail="Cannot send message to yourself"
        )
    
    message = Message(
        sender_id=sender_id,
        receiver_id=request.receiver_id,
        content=request.content
    )

    db.add(message)
    db.commit()
    db.refresh(message)

    return message


@router.get("/{user_id}", response_model=List[MessageResponse])
def get_conversation(user_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    
    other_user = db.query(User).filter(User.id == user_id).first()

    if not other_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    
    my_id = current_user["user_id"]
    messages = db.query(Message).filter(
        or_(
            and_(
                Message.sender_id == my_id,
                Message.receiver_id == user_id
            ),
            and_(
                Message.sender_id == user_id,
                Message.receiver_id == my_id
            )
        )
    ).order_by(Message.timestamp).all()

    return messages

