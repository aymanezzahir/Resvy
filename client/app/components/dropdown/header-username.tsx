import { cn } from "lib/util";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function DropdownUsername({ user }: { user: UserDTO }) {
  // stats
  const [hide, setHide] = useState<boolean>(true);
  const navigate = useNavigate();

  // admin nav
  let nav: { name: string; href: string }[] = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Reservation", href: "/reservation" },
    { name: "Utilisateurs", href: "/all-users" },
  ];
  if (user.role != "admin") {
    nav = [{ name: "Historique", href: "/user/historique" } , { name: "Parametre", href: "/user/settings" }];
  }

  const handleLogout = async () => {
    alert("log out");
  };
  return (
    <div className="relative">
      
      <button
        onClick={() => setHide((pre) => !pre)}
        className=" cursor-pointer bg-primary-500 text-white focus:ring-4 focus:outline-none focus:ring-primary-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center gap-3 inline-flex items-center"
        type="button"
      >
        <img src="/assets/icons/user.svg" className="fill-white" width={25} />
        <p className="font-bold text-lg">{user.username + " "}</p>
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      <div
        className={cn(
          "z-10 absolute hidden top-16 bg-white divide-y overflow-hidden divide-gray-100 rounded-lg shadow-sm w-44 ",
          { block: !hide }
        )}
      >
        <ul className=" text-sm  text-gray-700 ">
          {nav.map((e , i) => (
            <li key={i}>
              <a
                href={e.href}
                className="block px-4 py-2 hover:bg-primary-500 hover:text-white "
              >
                {e.name}
              </a>
            </li>
          ))}

        
          <hr />
          <li>
            <div
              onClick={handleLogout}
              className="block px-4 cursor-pointer py-2 hover:bg-red-500 hover:text-white "
            >
              Sign out
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
