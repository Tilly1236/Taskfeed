const BASE_URL = "http://localhost:3000"; // or localhost if testing locally

export async function postToFeed(message, token, groupId) {
  if (!token) {
    throw new Error("Missing auth token");
  }

  try {
    const response = await fetch(`${BASE_URL}/api/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        groupid: groupId,
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
