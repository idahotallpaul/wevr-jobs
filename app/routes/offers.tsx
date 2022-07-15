import { Outlet } from "@remix-run/react";

export default function OffersRoute() {
  return (
    <div>
      <h1>offers</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
