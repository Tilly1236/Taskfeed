const BASE_URL = "http://localhost:3000";

export async function postToFeed(message, token) {
  if (!token) {
    throw new Error("Missing auth token");
  }

  try {
    const response = await fetch(`${BASE_URL}/api/feed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        textcontent: message
      }),
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error(`Expected JSON but got: ${text}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error posting to feed:", error);
    throw error;
  }
}
