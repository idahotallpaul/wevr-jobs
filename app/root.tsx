import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { Container } from "react-bootstrap";

import { DemoNavbar } from "./components/DemoNavbar";

import styles from "./styles/main.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <DemoNavbar />
        <Container className="p-3 p-md-5" fluid>
          <Outlet />
        </Container>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
