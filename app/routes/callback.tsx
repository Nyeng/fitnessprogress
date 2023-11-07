//Handle callback given in strava.tsx
import { LoaderFunction, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import prisma from "prisma/client";
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
        //If userid does not exist in users db, store this data to user tables using prisma
        const user = await prisma.user.findUnique({
            where: {
                userId: user_response_data.athlete.id,
            },
        });

        if (!user) {
            await prisma.user.create({
                data: {
                    userId: user_response_data.athlete.id,
                    name: user_response_data.athlete.username,
                    accessToken: user_response_data.access_token,
                    refreshToken: user_response_data.refresh_token,
                    createdAt: new Date(user_response_data.expires_at * 1000),
                },
            });
        }
        session.set("username", user_response_data.athlete.username)
        session.set("userId", user_response_data.athlete.id);
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


export default function Profilepage() {
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