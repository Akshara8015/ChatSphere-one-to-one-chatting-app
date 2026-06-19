import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home() {

const navigate = useNavigate();

return (

<div className="home-container">

<div className="overlay"></div>

<div className="home-card">

<div className="logo-section">

<div className="chat-icon">
💬
</div>

<h1>ChatSphere</h1>

<p className="tagline">
Connect instantly. Chat seamlessly. Stay closer.
</p>

</div>


<div className="description">

Welcome to ChatSphere — a real-time one-to-one messaging platform built for smooth conversations and instant connectivity. Experience secure messaging, live updates, and a modern communication experience.

</div>


<div className="feature-container">

<div className="feature">
⚡ Real-time Messaging
</div>

<div className="feature">
🔒 Secure Communication
</div>

<div className="feature">
🌍 Stay Connected
</div>

</div>


<div className="button-container">

<button
className="login-btn"
onClick={() => navigate("/login")}
>
Login
</button>

<button
className="register-btn"
onClick={() => navigate("/register")}
>
Register
</button>

</div>

</div>

</div>

);

}

export default Home;