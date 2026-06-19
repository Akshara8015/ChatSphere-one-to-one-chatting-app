from pydantic import BaseModel
from pydantic import Field

class SendMessageRequest(BaseModel):
    receiver_id: int
    content: str = Field(
        min_length=1,
        max_length=1000
    )


class MessageResponse(BaseModel):
    id: int
    sender_id: int
    receiver_id: int
    content: str
    class Config:
        from_attributes = True


class WebSocketMessage(BaseModel):
    receiver_id: int
    content: str

    