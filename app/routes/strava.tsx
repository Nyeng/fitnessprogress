import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// add loader here to load env variables
export const loader: LoaderFunction = async () => {

    if (!process.env.CLIENT_ID) {
        throw new Error("Missing CLIENT_ID environment variable");
    }

    return { environent: process.env.ENVIRONMENT, client_id: process.env.CLIENT_ID };
}

export default function Login() {
    // Why are these never set? They turn out undefined
    const { environment, client_id } = useLoaderData<{ environment: string, client_id: string }>();

    if (environment === '' || client_id === '') {
        throw new Error("Missing environment parameters for either ENVIRONMENT or CLIENT_ID");
    }

    var base_url = environment === "Production" ? "https://www.fitnessprogress.run/" : "http://localhost:3000";

    const authorizationUrl = `https://www.strava.com/oauth/authorize?client_id=${client_id}&response_type=code&redirect_uri=${base_url}/callback&approval_prompt=auto&scope=read_all,activity:read_all`;

    return (
        <a href={authorizationUrl}>Login with Strava</a>
    );
}
