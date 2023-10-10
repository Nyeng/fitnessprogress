//Handle callback given in strava.tsx
//Console log the url parames that are returned
//


import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { URLSearchParams } from "url";

export const loader: LoaderFunction = async ({ request }) => {
    console.log("URL:", request.url);

    const urlParams = new URLSearchParams(request.url.split("?")[1]);
    const code = urlParams.get("code");

    // todo: create logic here to handle wrong scope, and also move this logic to a separate class / file
    const scope = urlParams.get("scope");
    const state = urlParams.get("state");

    if (!code) {
        throw new Error("Missing code parameter");
    }

    const params = new URLSearchParams({
        client_id: process.env.CLIENT_ID || '',
        client_secret: process.env.CLIENT_SECRET || '',
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
    console.log("access_token:", data.access_token);

    const user_data = await fetch("https://www.strava.com/api/v3/athlete", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${data.access_token}`
        }
    });

    const userdata_json = await user_data.json();

    console.log("user data:", userdata_json);
    console.log("first name", userdata_json.firstname);
    const name = userdata_json.firstname;
    return name ? json({ firstname: name }) : json({ firstname: "unknown" });
};


export default function Callback() {

    console.log("debug2")
    const name = useLoaderData<{ firstname: string }>();
    console.log("firstname debug in function callback", name)

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