export const parseuserinfo = async (token) => {
    if (!token) {
        throw new Error("Missing auth token");
      }
    try {
        let [header, payload, sig] = token.split(".");

        let header_decode = atob(header);
        let payload_decode = atob(payload);

        let payload_json = JSON.parse(payload_decode);
        let username = payload_json.username;
        return username; 
    } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
    }
};

