const removeExpiredToken = () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const [_, payload, __] = token.split(".");
      const decodedPayload = JSON.parse(atob(payload));

      if (decodedPayload && decodedPayload.exp) {
        const expirationTime = decodedPayload.exp * 1000; // Convert from seconds to milliseconds

        // When token is expired, remove it from localStorage
        if (Date.now() >= expirationTime) {
          localStorage.removeItem("token");
        }
      } else {
        // Token payload is invalid or missing expiration time, remove it from localStorage
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      // Remove the token if it's invalid or corrupt
      localStorage.removeItem("token");
    }
  }
};

export default removeExpiredToken;
