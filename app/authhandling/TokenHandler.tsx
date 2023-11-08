import { SessionData } from "@remix-run/node";

export async function isTokenExpired(session: SessionData) {
    const currentTime = Math.floor(Date.now() / 1000); // current time in seconds
    const expiresAt = session.get("expires_at");
    return currentTime >= expiresAt;
}

// This function fetches a new access token using the refresh token
export async function refreshAccessToken(session: SessionData) {
    const params = new URLSearchParams({
        client_id: process.env.CLIENT_ID || '',
        client_secret: process.env.CLIENT_SECRET || '',
        grant_type: "refresh_token",
        refresh_token: session.get("refresh_token")
    });

    const response = await fetch("https://www.strava.com/api/v3/oauth/token", {
        method: "POST",
        body: params
    });

    if (response.ok) {
        const data = await response.json();
        session.set("access_token", data.access_token);
        session.set("refresh_token", data.refresh_token);
        session.set("expires_at", data.expires_at);
        //Todo: should I watch out for name here as well?
        
    } else {
        console.error("Failed to refresh token");
        throw new Error("Token refresh failed");
    }
}

export async function fetchAccessToken(code: string): Promise<Response> {
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

    if (response.status !== 200) {
        throw new Error("Failed to fetch access token");
    }

    return response;
}