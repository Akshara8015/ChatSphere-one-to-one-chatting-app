from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import ForeignKey
from sqlalchemy import Text
from sqlalchemy import DateTime
from datetime import datetime

from app.database import Base


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True)
    sender_id = Column(Integer,ForeignKey("users.id"))
    receiver_id = Column(Integer,ForeignKey("users.id"))
    content = Column(Text)
    timestamp = Column(DateTime,default=datetime.utcnow)    

    