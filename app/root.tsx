import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";
import Menu from "./menu";
import stylesheet from "~/tailwind.css";
import { LinksFunction } from "@remix-run/node";
import { createElement } from "react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

const isClient = typeof document !== "undefined";

export function ErrorBoundary() {
  if (isClient) {
    return createElement("html", {
      suppressHydrationWarning: true,
      // Inject the server-side rendered HTML.
      dangerouslySetInnerHTML: {
        __html: document.getElementsByTagName("html")[0].innerHTML,
      },
    });
  }

  // Server-side rendered error page.
  return (
    <html lang="en">
      <head>
        <title>Oh no!</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
      <Menu />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <img src="https://cataas.com/cat/sad" alt="Sad cat" />
          <div className="flex justify-center items-center h-screen">
            <img
              src="https://cataas.com/cat/sad"
              alt="Sad cat"
              className="w-1/2 animate-pulse"
            />
            <h1 className="text-3xl font-bold ml-4 animate-bounce">
              Oh no! Something bad happened. Contact Vegard and ask why this occured
            </h1>
          </div>
        </div>
      </body>
    </html>
  );
}

export default function App() {

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Menu />

        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Analytics />
      </body>
    </html>
  );
}
