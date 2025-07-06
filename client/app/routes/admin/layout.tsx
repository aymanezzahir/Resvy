import { Outlet, redirect } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { NavBar, Mobilenav } from "~/components";
import axios from "axios";
import axiosInstance from "lib/axios";

export async function clientLoader() {
  try {
    const res = await axiosInstance.post("/api/auth/userdetails");
    const data: UserDetailsResponse = res.data;

    if (data.role !== "ROLE_ADMIN") {
      return redirect("/");
    }

    return data;
  } catch (error) {
    return redirect("/login");
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
