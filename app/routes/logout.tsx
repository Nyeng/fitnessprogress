import { LoaderFunction, redirect } from "@remix-run/node";
import { destroySession, getSession } from "~/sessions";


export const loader: LoaderFunction = async ({ request }) => {

    const session = await getSession(
        request.headers.get("Cookie")
      );
      
      return redirect("/", {
        headers: {
          "Set-Cookie": await destroySession(session),
        },
      });
}


export default function Logout(){
    // handle logout stuff
    // Create some animated stuff here

    return redirect("/")
}