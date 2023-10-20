//Handle callback given in strava.tsx
import { LoaderFunction, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { URLSearchParams } from "url";
import { getSession, commitSession } from "~/sessions";


export const loader: LoaderFunction = async ({ request }) => {
    const urlParams = new URLSearchParams(request.url.split("?")[1]);
    const code = urlParams.get("code");

    // prepare session
    const session = await getSession(
        request.headers.get("Cookie")
    );

    if (session.has("userId")) {
        // User logged in already
        return redirect("/");
    }

    // Todo: handle scopes
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

    let user_response_data;
    let user_id;

    if (response.status == 200) {
        user_response_data = await response.json();
        console.log("user resp data", user_response_data)
        user_id = user_response_data.athlete.username;
        session.set("userId", user_id);
        session.set("access_token",user_response_data.access_token)
        session.set("refresh_token",user_response_data.refresh_token)
        session.set("expires_at",user_response_data.expires_at)

        console.log(user_response_data.expires_at)
    }

    else {
        session.flash("error", "Invalid login");
        await commitSession(session)
        redirect("/")
    }

    return redirect("/", {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
};


export default function Callback() {

    const user_data = useLoaderData<{ userdata_json: JSON }>();
    console.log("userdata json:", user_data.userdata_json)
    console.log("headers", user_data.userdata_json)

    if (!user_data) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    } else {
        return <p>Hello user - Welcome to Fitness progress</p>;
    }
}