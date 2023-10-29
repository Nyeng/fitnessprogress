
export default async function GetFromStrava(endpoint: string, access_token?: string): Promise<string> {
    if (!access_token) {
        throw new Error("Access token is undefined");
    }

    const activitiesResponse = await fetch(`https://www.strava.com/api/v3/${endpoint}/`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    }).then((response) => {
        if (response.status != 200) {
            throw new Error("Unable to return response from Strava")
        }
        else {
            return response.json()
        }
    })
    return activitiesResponse;
}