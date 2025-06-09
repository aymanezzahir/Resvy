import { Outlet } from "react-router";
import {SidebarComponent} from "@syncfusion/ej2-react-navigations"
import {NavBar} from "~/components";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
        MobileSidebar

        <aside className="w-full max-w-[270px] hidden lg:block">
          <SidebarComponent width={279} enableGestures={false}>
            <NavBar />
          </SidebarComponent>
        </aside>
        <Outlet />
    </div>
  )
}
