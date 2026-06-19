import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chats from "./pages/Chats";
import ChatRoom from "./pages/ChatRoom";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Home/>}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/chats"
                    element={
                        <ProtectedRoute>
                            <Chats />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/chat/:userId"
                    element={
                        <ProtectedRoute>
                          <ChatRoom />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;

