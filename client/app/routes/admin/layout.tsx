import { Outlet } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { NavBar, Mobilenav } from "~/components";

export default function AdminLayout() {
  return (
    <div className="admin-layout">

      <Mobilenav />

      <aside className="w-full max-w-[270px] hidden lg:block">
        <SidebarComponent width={279} enableGestures={false}>
          <NavBar />
        </SidebarComponent>
      </aside>


      <aside className="children">
        <Outlet />
      </aside>
    </div>
  );
}
