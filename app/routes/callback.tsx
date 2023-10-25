//Handle callback given in strava.tsx
import { LoaderFunction, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { URLSearchParams } from "url";
import { fetchAccessToken } from "~/authhandling/TokenHandler";
import { getSession, commitSession } from "~/authhandling/sessions";


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

    var response = await fetchAccessToken(code);

    if (response.status == 200) {
        var user_response_data = await response.json();
        var user_id = user_response_data.athlete.username;
        session.set("userId", user_id);
        session.set("access_token", user_response_data.access_token)
        session.set("refresh_token", user_response_data.refresh_token)
        session.set("expires_at", user_response_data.expires_at)
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