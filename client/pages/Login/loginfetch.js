// loginfetch.js
// If your backend runs on localhost:3000 or 8080, change BASE_URL below:
const BASE_URL = 'http://localhost:3000';

export async function loginFetch(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
     // const errorData = await response.json();
     throw new Error(data.message || 'Invalid username or password');
    }

    // Should return { status: "OK", message: "<token>" }
    
    localStorage.setItem("token", data['message']);
    //return data;
    return response;
  } catch (error) {
    console.error('Error in loginFetch:', error);
    throw error;
  }
}
