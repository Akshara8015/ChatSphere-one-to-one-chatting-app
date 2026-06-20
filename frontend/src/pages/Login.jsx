import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsChatDotsFill } from "react-icons/bs";

import api from "../api/axios";


function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            localStorage.setItem(
                "user_id",
                response.data.user_id
            );

            localStorage.setItem(
                "username",
                response.data.username
            );

            alert("Login Successful");

            navigate("/");

        } catch (error) {

            console.error(error);

            alert("Invalid Credentials");
        }
    };

return (
  <div
    className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-slate-950
      via-slate-900
      to-blue-950
      p-60
    "
  >
    <div
      className="
        w-full
        max-w-md
        min-h-[500px]
        bg-slate-800/90
        backdrop-blur-md
        border
        border-slate-700
        rounded-3xl
        shadow-2xl
        px-10
        pt-20
        pb-14
      "
    >
      {/* Logo */}
    <div className="h-4"></div>
    <div className="flex justify-center mb-10 pt-12">
        <BsChatDotsFill
        size={45}
        className="text-blue-500"
        />
    </div>

      {/* Heading */}
      <div className="h-3"></div>
      <h1 className="text-3xl font-bold text-center text-white mb-12">
        LOGIN
      </h1>

      {/* Form */}
      <div className="h-4"></div>
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center gap-9"
      >
        {/* Email */}
        <div className="w-full flex flex-col items-center">
          <label className="w-4/5 text-sm font-medium text-slate-300 mb-3">
            Email Address
          </label>

          <input
            type="email"
            placeholder=" Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              padding-left: 1.5rem
              w-4/5
              h-12
              pr-4
              rounded-xl
              bg-slate-700
              border
              border-slate-600
              text-white
              placeholder:text-slate-400
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
        </div>

        {/* Password */}
        <div className="w-full flex flex-col items-center">
          <label className="w-4/5 text-sm font-medium text-slate-300 mb-3">
            Password
          </label>

          <input
            type="password"
            placeholder=" Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              pl-6
              w-4/5
              h-12
              pr-4
              rounded-xl
              bg-slate-700
              border
              border-slate-600
              text-white
              placeholder:text-slate-400
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="
            w-4/5
            h-12
            mt-3
            rounded-xl
            bg-gradient-to-r
            from-blue-500
            to-indigo-600
            text-white
            font-semibold
            hover:from-blue-600
            hover:to-indigo-700
            transition-all
          "
        >
          Login
        </button>
      </form>
      

      {/* Register */}
      <div className="h-5"></div>
      <div className="text-center text-lg text-slate-400 mb-4">
        <p className="text-center text-lg text-slate-400 mt-28 mb-2">
            Don't have an account? 

            <span
            onClick={() => navigate("/register")}
            className="
                ml-2
                text-blue-400
                font-large
                cursor-pointer
                hover:text-blue-300
            "
            >
            Register
            </span>
        </p>
        </div>
    </div>
  </div>
);

}

export default Login;
