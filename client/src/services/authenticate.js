import axios from "axios";

const saveToken = (token) => {
  localStorage.setItem("accessToken", token);
};
//saving a currentuser object at login time
// Safe base64url → JSON decoder for JWT payload
const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const json = atob(padded);
    return JSON.parse(json);
  } catch {
    return null;
  }
};

export const loginApi = async (email, password) => {
  const response = await axios.post(
    "http://localhost:8080/api/auth/login",
    { email, password },
    { headers: { "Content-Type": "application/json" } }
  );

  const token = response.data.token;
  saveToken(token);

  //decode the token to extract user info (userId, email, role, etc.)
  const payload = parseJwt(token) || {};
  const currentUser = {
    userId: Number(payload.userId ?? payload.id ?? payload.sub ?? 0), // adapt to your JWT claims
    email: payload.email ?? email,
    role: payload.role ?? (Array.isArray(payload.roles) ? payload.roles[0] : undefined),
  };
  localStorage.setItem("currentUser", JSON.stringify(currentUser));


  return response.data; // return only the data
};

export const signupApi = async (signupData) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/register",
      signupData,
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data; 

  } catch (error) {
    // Forward the backend status and message
    if (error.response) {
      throw {
        status: error.response.status,
        message: error.response.data.message || error.response.data.error,
      };
    } else {
      throw { status: 500, message: error.message };
    }
  }
};
