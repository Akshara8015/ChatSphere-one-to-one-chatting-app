import { useState } from "react";
import api from "../api/axios";
import "../styles/register.css";
import { useNavigate } from "react-router-dom";
import { BsChatDotsFill } from "react-icons/bs";


function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(
                "/auth/register", {
                    username,
                    email,
                    password
                });
            alert("Registration Successful! Please login.");
            navigate("/");
        } catch (error) {
            alert("Registration Failed");
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
      min-h-[600px]
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
      Create Account
    </h1>

    {/* Form */}
    <div className="h-6"></div>
    <form
      onSubmit={handleRegister}
      className="flex flex-col items-center gap-7"
    >
      {/* Name */}
      <div className="w-full flex flex-col items-center">
        <label className="w-4/5 text-sm font-medium text-slate-300 mb-3">
          User Name
        </label>

        <input
          type="text"
          placeholder=" Enter your UserName"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="
            w-4/5
            h-12
            px-4
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

      {/* Email */}
      <div className="w-full flex flex-col items-center">
        <label className="w-4/5 text-sm font-medium text-slate-300 mb-5">
          Email Address
        </label>

        <input
          type="email"
          placeholder=" Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-4/5
            h-12
            px-4
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
            w-4/5
            h-12
            px-4
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

      {/* Register Button */}
      <div className="h-1"></div>
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
        Create Account
      </button>
    </form>

    {/* Login Link */}
    <div className="h-4"></div>
    <div className="text-center text-lg text-slate-400 mt-12">
      Already have an account?

      <span
        onClick={() => navigate("/login")}
        className="
          ml-2
          text-blue-400
          font-semibold
          cursor-pointer
          hover:text-blue-300
        "
      >
        Login
      </span>
    </div>
  </div>
</div>
);

}

export default Register;

