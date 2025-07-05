import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";

import { cn } from "~/../lib/util";
import DropdownUsername from "./dropdown/header-username";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RootNavbar() {
  const [user , setUser] = useState<UserDetailsResponse | null>(null)
  const location = useLocation();
  const params = useParams();
  //   const user = useLoaderData();
  const navigate = useNavigate();
  const handleLogout = async () => {
    navigate("/logout");
  };
  

  useEffect(()=> {
    async function getUserData(){
      const res = await axios.post(import.meta.env.VITE_SERVER2 + "/api/auth/userdetails" , null , {withCredentials : true});
      const user : UserDetailsResponse = res.data
      setUser(user);
    }

    getUserData();
  } , []);
  return (
    <nav className={cn("w-full fixed z-50 glassmorphism")}>
      <header className="root-nav wrapper">
        <Link to="/" className="link-logo">
          <img src="/assets/logo.png" alt="logo" className="size-[30px]" />
          <h1>Resvy</h1>
        </Link>


        {!user ? (
          <LogoutPerpective />
        ) : (
          <div className="flex items-center gap-8">
            {user.role == "ROLE_ADMIN" ? (
              <AdminPerpective />
            ) : (
              <CustomerPerspective />
            )}
            <DropdownUsername user={user} />
          </div>
        )}
      </header>
    </nav>
  );
}

function CustomerPerspective() {
  return (
    <>
     
      <Link
        to="/user/chambre"
        className={cn(
          "text-base font-semibold  rounded-2xl "
        )}
      >
        Chambres
      </Link>
    </>
  );
}
function AdminPerpective() {
  return (
    <>
      <Link
        to="/dashboard"
        className={cn(
          "text-base font-semibold text-white px-6 py-2 rounded-2xl bg-primary-100"
        )}
      >
        Admin Panel
      </Link>
    </>
  );
}

function LogoutPerpective() {
  return (
    <aside>
      <Link
        to="/login"
        className={cn("text-base font-semibold text-primary-100")}
      >
        Login
      </Link>

      <Link
        to="/signup"
        className={
          "text-base bg-primary-500 rounded-2xl  p-2 font-normal text-white"
        }
      >
        Sign Up
      </Link>
    </aside>
  );
}
