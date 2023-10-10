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
        <div className="flex flex-col items-center justify-center h-screen">
          <img
            src="https://cataas.com/cat/sad"
            alt="Sad cat"
            className="w-1/2 mb-4 md:w-1/4 animate-pulse"
          />
          <h1 className="text-xl font-bold animate-bounce md:text-2xl md:font-extrabold md:animate-pulse">
            Oh no! Something bad happened. Contact Vegard and ask why this occurred.
          </h1>
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
