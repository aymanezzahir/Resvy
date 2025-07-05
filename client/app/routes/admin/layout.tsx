import { Outlet, redirect } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { NavBar, Mobilenav } from "~/components";
import axios from "axios";

export async function clientLoader() {
  try {
    // const user = await axios.get('');

    const user: UserDTO = {
      id: 101,
      username: "clairedu",
      email: "claire.dupont@example.com",
      fullName: "Claire Dupont",
      role: "admin",
      createdAt: new Date("2024-12-01T10:30:00Z"),
    };

    if (!user) return redirect("/sign-in");

    if (user?.role != "admin") {
      return redirect("/");
    }

    return user;
  } catch (e) {
    console.log("Error in clientLoader", e);
    return redirect("/sign-in");
  }
}

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <Mobilenav />

      <aside className="w-full max-w-[270px] hidden 2xl:block">
        <SidebarComponent width={270} enableGestures={false}>
          <NavBar />
        </SidebarComponent>
      </aside>

      <aside className="children">
        <Outlet />
      </aside>
    </div>
  );
}
