// signupfetch.js
const BASE_URL = 'http://localhost:3000'; // Update this if needed

export async function signupFetch(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      throw new Error(`Signup failed with status ${response.status}`);
    }

    const data = await response.json(); // Should be: { status: "Created", message: "Success" }



    return data;
  } catch (error) {
    console.error('Error in signupFetch:', error);
    throw error;
  }
}
