import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Menu from "./menu";
import stylesheet from "~/tailwind.css";
import { LinksFunction, LoaderFunction, redirect } from "@remix-run/node";
import { createElement } from "react";
import { commitSession, getSession } from "./authhandling/sessions";
import { isTokenExpired, refreshAccessToken } from "./authhandling/TokenHandler";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

const isClient = typeof document !== "undefined";

export const loader: LoaderFunction = async ({ request }) => {

  let session = await getSession(
    request.headers.get("Cookie")
  );

  if (await isTokenExpired(session)) {
    try {
      await refreshAccessToken(session);
      return redirect("/", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    } catch (error) {
      console.error("Error refreshing token:", error);
      session.flash("error", "Session expired. Please log in again.");
    }

    if (!process.env.CLIENT_ID) {
      throw new Error("Missing CLIENT_ID environment variable");
    }
  }
  //Todo: easy recactor this into one object with values instead of passing several values
  return { client_id: process.env.CLIENT_ID, vercel_environment: process.env.VERCEL_ENV, vercel_url: process.env.VERCEL_URL, username: session.data.username, access_token: session.data.access_token };
}


// Todo, move this out of root to clean up
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
        <div className="flex flex-col items-center justify-center h-screen">
          <img
            src="https://cataas.com/cat/sad"
            alt="Sad cat"
            className="w-1/2 mb-4 md:w-1/4 animate-pulse"
          />
          <h1 className="text-xl font-bold animate-bounce md:text-2xl md:font-extrabold md:animate-pulse">
            Oh no! Something bad happened. Contact Vegard to let him know.
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
      </body>
    </html>
  );
}
