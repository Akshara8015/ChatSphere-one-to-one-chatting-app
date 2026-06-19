from fastapi import APIRouter
from fastapi import WebSocket
from fastapi import WebSocketDisconnect

import json
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.message import Message
from app.websocket_manager import manager

router = APIRouter()

@router.websocket("/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int):
    await manager.connect(user_id, websocket)

    try:
        while True:
            data = await websocket.receive_text()
            payload = json.loads(data)
            receiver_id = payload["receiver_id"]
            content = payload["content"]
            db = SessionLocal()
            message = Message(
                sender_id=user_id,
                receiver_id=receiver_id,
                content=content
            )
            db.add(message)
            db.commit()
            db.refresh(message)

            await manager.send_personal_message({
                    "id": message.id,
                    "sender_id": user_id,
                    "receiver_id": receiver_id,
                    "content": content
                }, receiver_id)
            
            db.close()

    except WebSocketDisconnect:
        manager.disconnect(user_id)

