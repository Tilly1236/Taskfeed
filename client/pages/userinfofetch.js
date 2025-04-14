export async function fetchUserInfo(token) {
    if (!token) {
        throw new Error("Missing auth token");
      }
    try {
        const response = await fetch("http://localhost:3000/api/user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // Pass the auth token
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user info");
        }

        const userData = await response.json();
        return userData.username; // Assuming the API returns { username: "JohnDoe" }
    } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
    }
};

