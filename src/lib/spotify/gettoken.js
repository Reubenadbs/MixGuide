import fetch from "node-fetch";

const CLIENT_ID = "7819a137f9414f608919e8f5cd3dc5e3";
const CLIENT_SECRET = "84801239a9494ee6800109081f37e210";

export async function getToken() {
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization":
          "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")
      },
      body: new URLSearchParams({ grant_type: "client_credentials" })
    });
  
    const data = await res.json();
    console.log("Access token:", data.access_token);
    return data.access_token;
  }
  
  // test het:
  getToken();