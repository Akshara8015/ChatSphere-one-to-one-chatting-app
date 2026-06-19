import axios from "axios";

const api = axios.create({
    baseURL: "https://chatsphere-one-to-one-chatting-app.onrender.com"
});

export default api;
