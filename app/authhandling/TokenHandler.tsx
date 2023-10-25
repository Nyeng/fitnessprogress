import { SessionData, redirect } from "@remix-run/node";



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
    } else {
        console.error("Failed to refresh token");
        throw new Error("Token refresh failed");
    }
}
