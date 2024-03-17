import axios from "axios";

// Get tokenUrl and tokenKey from environment variables
const tokenUrl = process.env.tokenUrl;
const tokenKey = process.env.tokenKey;

// // Function to make a GET request to the specified URL
// export async function fetchData(): Promise<any> {
//   try {
//     const response = await axios.get(`${tokenUrl}/`);
//     return response;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// }
export async function connectToToken(): Promise<any> {
  try {
    // Define headers with API key
    const headers = {
      "api-key": tokenKey,
    };

    // Make a GET request to the token URL with token key and API key in headers
    const response = await axios.get(`${tokenUrl}/`, { headers });

    // Check if the response status is successful (2xx)
    if (response.status >= 200 && response.status < 300) {
      console.log("Connected to TokenServer");
      return response.data; // Return data if successful
    } else {
      console.error("Error connecting to TokenServer:", response.statusText);
      throw new Error(response.statusText); // Throw an error if response status is not successful
    }
  } catch (error: any) {
    console.error("Error connecting to TokenServer:", error.message);
    throw error;
  }
}

export async function signtoken(email: string, role: any): Promise<any> {
  try {
    // Define payload with email and role
    const payload = {
      email,
      role,
    };
    const headers = {
      "api-key": tokenKey,
    };

    // Make a POST request to the external API
    const response = await axios.post(`${tokenUrl}/token/sign-token`, payload, {
      headers,
    });

    // Check if the response status is successful (2xx)
    if (response.status >= 200 && response.status < 300) {
      console.log("Token signed successfully");
      console.log(response.data.token);

      return response.data.token;
    } else {
      console.error("Error signing token:", response.statusText);
      throw new Error(response.statusText);
    }
  } catch (error: any) {
    console.error("Error signing token:", error.message);
    throw error;
  }
}
