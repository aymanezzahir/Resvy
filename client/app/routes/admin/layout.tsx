import { Outlet, redirect } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { NavBar, Mobilenav } from "~/components";
import axios from "axios";

export async function clientLoader() {
  // const user = await axios.get('');

  const res = await axios.post(
    "http://192.168.3.235:8080/api/auth/userdetails",
    null,
    { withCredentials: true }
  );
  const data: UserDetailsResponse = res.data;

  console.log(data);

  return data;
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
