from fastapi import FastAPI

from app.database import Base
from app.database import engine
from app.models import *
from app.models.user import User
from app.models.message import Message
from app.routes.chats import router as chat_router
from app.routes.users import router as user_router
from app.routes.auth import router as auth_router
from app.routes.message import router as message_router
from app.routes.websocket import router as websocket_router

from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://chatsphere-one-to-one-chatting-app-vert.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"]
)

app.include_router(
    user_router,
    prefix="/users",
    tags=["Users"]
)

app.include_router(
    message_router,
    prefix="/messages",
    tags=["Messages"]
)

app.include_router(
    websocket_router,
    prefix="/ws",
    tags=["WebSocket"]
)

app.include_router(
    chat_router,
    prefix="/chats",
    tags=["Chats"]
)

@app.get("/")
def home():
    return {"message": "ChatSphere Backend Running"}


