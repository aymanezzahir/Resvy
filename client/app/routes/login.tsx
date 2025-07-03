import { Link } from "react-router";
import type { Route } from "../+types/root";



export default function Login() {
  return (
    <div className="signin w-screen h-screen">
      <form className="max-w-md min-w-sm p-5 rounded-2xl  bg-white  mx-auto fixed centerP ">
        <Link to={"/"} className="flex justify-center gap-3">
          <img src="/assets/logo.png" alt="logo" width={30} />
          <h1 className="text-center font-bold text-4xl">Resvy</h1>
        </Link>
        <hr className="my-4 border-gray-500" />
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Nom D'utilisateur
          </label>
          <input
            type="username"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
            placeholder="ex (ayman2)"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
            required
          />
        </div>
        <p className="text-sm mt-4">
          Mot de passe oublié ?{" "}
          <a
            href="/reset-password"
            className="text-primary-100 underline hover:opacity-80"
          >
            Réinitialisez-le ici
          </a>
        </p>

        <div className="flex justify-between">
            
        <button
          type="submit"
          className="text-white cursor-pointer mt-3 bg-primary-500 hover:bg-primary-500 focus:ring-4 focus:outline-none focus:ring-primary-100 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Login
        </button>
        <Link
        to={"/signup"}
          
          className="text-white mt-3 bg-primary-100 hover:bg-primary-500 focus:ring-4 focus:outline-none focus:ring-primary-100 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          sign up
        </Link>
        </div>
      </form>
    </div>
  );
}
