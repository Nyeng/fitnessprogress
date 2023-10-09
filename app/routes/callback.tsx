//Handle callback given in strava.tsx
//Console log the url parames that are returned
//




import { LoaderFunction } from "@remix-run/node";
import { URLSearchParams } from "url";

export const loader: LoaderFunction = async ({ request }) => {
    console.log("URL:", request.url);

    const urlParams = new URLSearchParams(request.url.split("?")[1]);
    const code = urlParams.get("code");
    const scope = urlParams.get("scope");
    const state = urlParams.get("state");

    console.log("code:", code);

    return {
        props: {
            code,
            scope,
            state,
        },
    };
};

export default function Callback({
    code, scope, state, }: { code: string; scope: string; state: string; }) {
    console.log("code:", code);
    console.log("scope:", scope);
    console.log("state:", state);

    // Your code here

    return null;
}

