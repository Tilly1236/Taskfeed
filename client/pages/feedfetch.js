// signupfetch.js
const BASE_URL = 'http://localhost:3000'; // Update this if needed

export async function signupFetch(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json(); // Should be: { status: "Created", message: "Success" }

    if (!response.ok) {
      throw new Error(data['message']);
    }


    return data;
  } catch (error) {
    console.error('Error in signupFetch:', error);
    throw error;
  }
}
