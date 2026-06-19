from pydantic import BaseModel

class ChatResponse(BaseModel):
    user_id: int
    username: str
    class Config:
        from_attributes = True

        