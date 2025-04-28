// signupfetch.js
const BASE_URL = 'http://localhost:3000'; // Update this if needed

export async function feedFetch(groupId) {
  try {
    const response = await fetch(`${BASE_URL}/api/feed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        "groupid": groupId,
        "latest": Math.floor(Date.now() / 1000), // Unix epoch in seconds
        "earliest": 1 // Unix epoch in seconds
        })
    });

    const data = await response.json(); // Should be: { status: "Created", message: "Success" }

    return data;
  } catch (error) {
    console.error('Error in signupFetch:', error);
    throw error;
  }
}
