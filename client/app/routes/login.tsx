import { Link, Navigate, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "lib/axios";

interface UserDetailsResponse {
  role: "ROLE_ADMIN" | "ROLE_CUSTOMER";
  // Add other fields if needed
}

export default function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [userDetails, setUserDetails] = useState<UserDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function submitFunc(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await axiosInstance.post("/api/auth/login",user , { withCredentials:true});

      const res = await axiosInstance.post("/api/auth/userdetails" ,null , {withCredentials:true})
      localStorage.setItem("ui" , res.data.id)
        navigate("/");
      
    } catch (err) {
      alert("username/mot de passe est incorrect!")
    }
  }



  // If session already active, redirect
  if (!loading && userDetails) {
    return userDetails.role === "ROLE_ADMIN"
      ? <Navigate to="/dashboard" />
      : <Navigate to="/user/chambre" />;
  }

  return (
    <div className="signin w-screen h-screen">
      <form
        onSubmit={submitFunc}
        className="max-w-md min-w-sm p-5 rounded-2xl bg-white mx-auto fixed centerP"
      >
        <Link to="/" className="flex justify-center gap-3">
          <img src="/assets/logo.png" alt="logo" width={30} />
          <h1 className="text-center font-bold text-4xl">Resvy</h1>
        </Link>

        <hr className="my-4 border-gray-500" />

      
        <div className="mb-5">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
            Nom d'utilisateur
          </label>
          <input
            type="text"
            id="username"
            value={user.username}
            onChange={(e) => setUser(prev => ({ ...prev, username: e.target.value }))}
            placeholder="ex (ayman2)"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
        </div>

      
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser(prev => ({ ...prev, password: e.target.value }))}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
        </div>

 
        <div className="flex justify-between gap-4">
          <button
            type="submit"
            className="text-white cursor-pointer mt-3 bg-primary-500 hover:bg-primary-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
          >
            Login
          </button>
          <Link
            to="/signup"
            className="text-white mt-3 bg-primary-100 hover:bg-primary-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5"
          >
            S'inscrire
          </Link>
        </div>
      </form>
    </div>
  );
}
