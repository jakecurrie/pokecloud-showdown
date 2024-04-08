import { Outlet } from "@remix-run/react";

export default function AppLayout() {
  return (
    <div className="flex flex-col">
      <Outlet />
    </div>
  );
}
