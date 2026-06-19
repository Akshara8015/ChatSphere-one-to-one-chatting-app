import { useEffect, useState } from "react";
import { getToken } from "../api/auth";
import api from "../api/axios";
import "../styles/chats.css";

function Chats() {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [socket, setSocket] = useState(null);

    const loggedUser =
        localStorage.getItem("username") || "User";

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {

            const response = await api.get(
                "/users",
                {
                    headers: {
                        Authorization:
                            `Bearer ${getToken()}`
                    }
                }
            );

            setUsers(response.data);

        } catch(error){
            console.log(error);
        }
    };


    const fetchConversation = async(userId)=>{

        try{

            const response=await api.get(
                `/messages/${userId}`,
                {
                    headers:{
                        Authorization:
                        `Bearer ${getToken()}`
                    }
                }
            );

            setMessages(response.data);

        }catch(error){

            console.log(error);

        }

    };


    useEffect(()=>{

        const userId=
        localStorage.getItem("user_id");

        if(!userId) return;

        const ws=
        new WebSocket(
            `ws://https://chatsphere-one-to-one-chatting-app.onrender.com/ws/${userId}`
        );

        ws.onmessage=(event)=>{

            const message=
            JSON.parse(event.data);

            setMessages(prev=>[
                ...prev,
                message
            ]);

        };

        setSocket(ws);

        return ()=>ws.close();

    },[]);



    const sendMessage=()=>{

        if(
            !newMessage.trim()
            || !selectedUser
        ) return;


        socket.send(

            JSON.stringify({

                receiver_id:
                selectedUser.id,

                content:
                newMessage

            })

        );


        setMessages(prev=>[
            ...prev,
            {
                id:Date.now(),
                sender_id:Number(
                    localStorage.getItem(
                        "user_id"
                    )
                ),
                content:newMessage
            }
        ]);

        setNewMessage("");

    };


return(

<div className="chat-layout">

    {/* Sidebar */}

<div className="sidebar">

<div className="logo">
ChatSphere
</div>

<div className="current-user">

<div className="avatar">
{loggedUser[0].toUpperCase()}
</div>

<div>

<h4>{loggedUser}</h4>

<p>Online</p>

</div>

</div>


<div className="users-title">
Users
</div>


<div className="user-list">

{users.map((user)=>(

<div
key={user.id}

className={`user-card
${
selectedUser?.id===user.id
?"active":""
}`}

onClick={()=>{

setSelectedUser(user);

fetchConversation(
user.id
);

}}
>

<div className="avatar">

{user.username[0]
.toUpperCase()}

</div>

<div>

<h4>
{user.username}
</h4>

<p>
Tap to chat
</p>

</div>

</div>

))}

</div>


<button
className="logout-btn"

onClick={()=>{

localStorage.removeItem("token");
localStorage.removeItem("user_id");
localStorage.removeItem("username");

window.location="/";

}}
>

Logout

</button>

</div>



{/* Chat section */}

<div className="chat-section">

{selectedUser ? (

<>

<div className="chat-header">

<div className="avatar">

{
selectedUser.username[0]
.toUpperCase()
}

</div>

<div>

<h3>
{selectedUser.username}
</h3>

<p>Active now</p>

</div>

</div>



<div className="messages-container">

{messages.map((msg)=>(

<div
key={msg.id}

className={
msg.sender_id===
Number(
localStorage.getItem(
"user_id"
)
)

?
"message sent"

:
"message received"

}
>

{msg.content}

</div>

))}

</div>



<div className="message-input">

<input

value={newMessage}

onChange={(e)=>
setNewMessage(
e.target.value
)
}

placeholder=
"Type message..."
/>


<button
onClick={
sendMessage
}
>
Send
</button>

</div>

</>

):(

<div className="empty-screen">

<h2>
Select a user
</h2>

<p>
Start chatting in ChatSphere 🚀
</p>

</div>

)}

</div>

</div>

)

}

export default Chats;
