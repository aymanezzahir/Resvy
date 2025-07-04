import { Link } from "react-router"; // ✅ corrected import
import { useEffect, useState } from "react";
import axios from "axios"

export default function Login() {
  const [user, setUser] = useState({ username: "", password: "" });

  async function getUser(){
    const res =await axios.get("http://192.168.3.235:8080/api/users" )

    

    console.log(res)


  }
  async function submitFunc(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/login", {
        method: "POST", // ✅ POST for form data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user), // ✅ JSON-encoded body
      });

      if (!res.ok) {
        throw new Error("Échec de connexion");
      }

      const data = await res.json();
      console.log("Connexion réussie", data);
      // TODO: Save token or navigate
    } catch (err) {
      console.error("Erreur:", err);
      alert("Nom d'utilisateur ou mot de passe invalide.");
    }
  }

  useEffect(()=>{
    getUser();
  }, [])

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

        {/* Username */}
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Nom d'utilisateur
          </label>
          <input
            type="text" // ✅ corrected
            id="username"
            value={user.username}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, username: e.target.value }))
            }
            placeholder="ex (ayman2)"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, password: e.target.value }))
            }
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          />
        </div>

        {/* Forgot password */}
        <p className="text-sm mt-4">
          Mot de passe oublié ?{" "}
          <a
            href="/reset-password"
            className="text-primary-100 underline hover:opacity-80"
          >
            Réinitialisez-le ici
          </a>
        </p>

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          <button
            type="submit"
            className="text-white cursor-pointer mt-3 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-100 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Login
          </button>
          <Link
            to="/signup"
            className="text-white mt-3 bg-primary-100 hover:bg-primary-500 focus:ring-4 focus:outline-none focus:ring-primary-100 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            S'inscrire
          </Link>
        </div>
      </form>
    </div>
  );
}
