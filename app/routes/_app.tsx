import { Outlet } from "@remix-run/react";

import NavBar from "~/components/navBar"

export default function AppLayout() {
  return(
    <main>
      <NavBar />
      <Outlet />
    </main>
  )
}