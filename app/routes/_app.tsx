import { Outlet } from "@remix-run/react";

import NavBar from "~/components/navBar"

export default function AppLayout() {
  return(
    <div className="flex flex-col">
      <NavBar />
      <div className="mt-10">
        <Outlet />
      </div>
    </div>
  )
}