import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";

import { cn } from "~/../lib/util";
import DropdownUsername from "./dropdown/header-username";

export default function RootNavbar() {
  const location = useLocation();
  const params = useParams();
  //   const user = useLoaderData();
  const navigate = useNavigate();
  const handleLogout = async () => {
    navigate("/sign-in");
  };
  const user: UserDTO = {
    id: 101,
    username: "clairedu",
    email: "claire.dupont@example.com",
    fullName: "Claire Dupont",
    role: "Client",
    createdAt: new Date("2024-12-01T10:30:00Z"),
  };
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
            {user.role == "admin" ? (
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
