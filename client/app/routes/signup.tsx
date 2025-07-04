import axios from "axios";
import checkformsignup from "lib/checksignupform";
import { cn } from "lib/util";
import { useState } from "react";
import { Link } from "react-router";

const initHide = { hide: true, message: "" };

export default function Signup() {
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [hideErrorMessage, setHideError] = useState<{
    hide: boolean;
    message: string;
  }>(initHide);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHideError(initHide);

    const result = checkformsignup(
      form.email,
      form.username,
      form.password,
      form.cpassword
    );

    if (!result.valid) {
      setHideError({
        hide: false,
        message: result.message,
      });
      return;
    }

    const Registration = {
      fullName: form.fullname,
      password: form.password,
      email: form.email,
      username: form.username,
    };

    try {
      const response = await axios.post(
        "http://192.168.3.235:8080/api/users/register",
        Registration,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Inscription réussie :", response.data);
      alert("✅ Inscription réussie !");
    } catch (error: any) {
      console.error(
        "❌ Erreur d'inscription :",
        error.response?.data || error.message
      );
      setHideError({
        hide: false,
        message: error.response?.data?.message || "Erreur serveur",
      });
    }
  };

  return (
    <div className="signup w-screen h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-md min-w-sm p-5 rounded-2xl bg-white mx-auto fixed centerP"
      >
        <Link to={"/"} className="flex justify-center gap-3">
          <img src="/assets/logo.png" alt="logo" width={30} />
          <h1 className="text-center font-bold text-4xl">Resvy</h1>
        </Link>

        <hr className="my-4 border-gray-500" />
        <ErrorFound {...hideErrorMessage} />

        {/* Nom complet */}
        <div className="mb-5">
          <label
            htmlFor="fullname"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Nom complet
          </label>
          <input
            type="text"
            id="fullname"
            value={form.fullname}
            onChange={handleChange}
            placeholder="Walter White"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          />
        </div>

        {/* Nom d'utilisateur */}
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Nom d'utilisateur
          </label>
          <input
            type="text"
            id="username"
            value={form.username}
            onChange={handleChange}
            placeholder="walter4"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            placeholder="walterwhite4@gmail.com"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          />
        </div>

        {/* Mot de passe */}
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
            value={form.password}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          />
        </div>

        {/* Confirme mot de passe */}
        <div className="mb-5">
          <label
            htmlFor="cpassword"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Confirmez le mot de passe
          </label>
          <input
            type="password"
            id="cpassword"
            value={form.cpassword}
            onChange={handleChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          />
        </div>

        {/* Boutons */}
        <div className="flex justify-between gap-4">
          <button
            type="submit"
            className="text-white cursor-pointer mt-3 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-100 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          >
            Enregistrer
          </button>
          <Link
            to={"/login"}
            className="text-white mt-3 bg-primary-100 hover:bg-primary-500 focus:ring-4 focus:outline-none focus:ring-primary-100 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

function ErrorFound({
  hide = true,
  message,
}: {
  hide: boolean;
  message: string;
}) {
  return (
    <div
      className={cn(
        {
          hidden: hide,
          flex: !hide,
        },
        "bg-red-400 p-3 rounded-2xl mb-2 items-center gap-2"
      )}
    >
      <img alt="error image" width={20} src="/assets/icons/error.svg" />
      <p>{message}</p>
    </div>
  );
}