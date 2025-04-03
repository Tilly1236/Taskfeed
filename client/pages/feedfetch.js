// signupfetch.js
const BASE_URL = 'http://localhost:3000'; // Update this if needed

export async function feedFetch() {
  try {
    const response = await fetch(`${BASE_URL}/api/feed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        "groupid": 1,
        "latest": Math.floor(Date.now() / 1000),
        "earliest": 1
        })
    });

    const data = await response.json(); // Should be: { status: "Created", message: "Success" }

    return data;
  } catch (error) {
    console.error('Error in signupFetch:', error);
    throw error;
  }
}
