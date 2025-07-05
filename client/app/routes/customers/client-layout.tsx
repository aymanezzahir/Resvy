import { Outlet } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import {  RootNavbar } from "~/components";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
        <RootNavbar />
      <aside className="children py-26">
        <Outlet />
      </aside>
    </div>
  );
}
