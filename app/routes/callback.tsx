//Handle callback given in strava.tsx
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { URLSearchParams } from "url";

export const loader: LoaderFunction = async ({ request }) => {
    const urlParams = new URLSearchParams(request.url.split("?")[1]);
    const code = urlParams.get("code");

    // todo: create logic here to handle wrong scope, and also move this logic to a separate class / file
    const scope = urlParams.get("scope");
    const state = urlParams.get("state");

    if (!code) {
        throw new Error("Missing code parameter");
    }

    if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
        throw new Error("Missing CLIENT_ID or CLIENT_SECRET environment variable");
    }

    const params = new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: code,
        grant_type: "authorization_code"
    });

    const response = await fetch("https://www.strava.com/api/v3/oauth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    });

    const data = await response.json();

    const user_data = await fetch("https://www.strava.com/api/v3/athlete", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${data.access_token}`
        }
    });

    const userdata_json = await user_data.json();
    const name = userdata_json.firstname;
    return name ? json({ firstname: name }) : json({ firstname: "unknown" });
};


export default function Callback() {

    const name = useLoaderData<{ firstname: string }>();

    if (!name) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    } else {
        return <p>Hello {name.firstname} - Welcome to Fitness progress</p>;


        
    }
}