import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { getToken } from "../api/auth";
import { getCurrentUserId } from "../api/user";
import "../styles/chatroom.css";

function ChatRoom() {

    const { userId } = useParams();

    const currentUserId = getCurrentUserId();

    const [messages,setMessages] = useState([]);
    const [newMessage,setNewMessage] = useState("");
    const [socket,setSocket] = useState(null);

    const messagesEndRef = useRef(null);

    useEffect(()=>{

        fetchMessages();

    },[userId]);


    useEffect(()=>{

        const ws = new WebSocket(
            `ws://127.0.0.1:8000/ws/${currentUserId}`
        );

        ws.onopen=()=>{

            console.log(
                "WebSocket Connected"
            );

        };

        ws.onmessage=(event)=>{

            const incomingMessage =
            JSON.parse(
                event.data
            );

            setMessages(prev=>[
                ...prev,
                incomingMessage
            ]);

        };

        setSocket(ws);

        return ()=>{

            ws.close();

        };

    },[]);


    useEffect(()=>{

        messagesEndRef.current?.scrollIntoView({
            behavior:"smooth"
        });

    },[messages]);


    const fetchMessages=async()=>{

        try{

            const response=
            await api.get(
                `/messages/${userId}`,
                {
                    headers:{
                        Authorization:
                        `Bearer ${getToken()}`
                    }
                }
            );

            setMessages(
                response.data
            );

        }
        catch(error){

            console.log(error);

        }

    };


    const sendMessage=()=>{

        if(
            !socket ||
            !newMessage.trim()
        )
        return;

        socket.send(

            JSON.stringify({

                receiver_id:
                Number(userId),

                content:
                newMessage

            })

        );

        setMessages(prev=>[
            ...prev,
            {
                id:Date.now(),
                sender_id:
                currentUserId,
                content:newMessage
            }
        ]);

        setNewMessage("");

    };


    return(

<div className="chat-container">

<div className="chat-header">

<h2>
Chat
</h2>

</div>


<div className="messages">

{messages.length===0 ?

<div className="empty-chat">

No messages yet 👋

</div>

:

messages.map(message=>(

<div
key={message.id}

className={
message.sender_id===currentUserId
?
"message sent"
:
"message received"
}
>

{message.content}

<div className="message-time">

{new Date().toLocaleTimeString(
[],
{
hour:"2-digit",
minute:"2-digit"
}
)}

</div>

</div>

))

}

<div ref={messagesEndRef}></div>

</div>



<div className="input-container">

<input

type="text"

value={newMessage}

placeholder="Type a message..."

onChange={(e)=>
setNewMessage(
e.target.value
)
}

onKeyDown={(e)=>{

if(
e.key==="Enter"
){

sendMessage();

}

}}

/>

<button
onClick={
sendMessage
}
>

Send

</button>

</div>

</div>

);

}

export default ChatRoom;