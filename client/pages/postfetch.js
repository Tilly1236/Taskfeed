const BASE_URL = 'http://localhost:3000'; // Adjust if your backend is hosted elsewhere

export async function postToFeed(username, message, token) {
  try {
    const response = await fetch(`${BASE_URL}/api/feed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        username,
        groupid: 1, // Adjust if group selection is added later
        textcontent: message
      })
    });

    return await response.json(); // Might be { status: "Created", message: "Success" }
  } catch (error) {
    console.error("Error posting to feed:", error);
    throw error;
  }
}