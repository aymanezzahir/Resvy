import axios from "axios";
import { Outlet, redirect } from "react-router";

import {  RootNavbar } from "~/components";

export async function clientLoader() {
  try {
    // const user = await axios.get('');

     
        const res = await axios.post(
          "http://192.168.3.235:8080/api/auth/userdetails",
          null,
          { withCredentials: true }
        );
        const data: UserDetailsResponse = res.data;
        
      
    if (!data) return redirect("/login");

    if (data?.role != "ROLE_CUSTOMER") {
      return redirect("/");
    }

    return data;
  } catch (e) {
    console.log("Error in clientLoader", e);
    return redirect("/sign-in");
  }
}


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
