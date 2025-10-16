import axios from "axios";

const saveToken = (token) => {
  localStorage.setItem("accessToken", token);
};

export const loginApi = async (email, password) => {
  const response = await axios.post(
    "http://localhost:8080/api/auth/login",
    { email, password },
    { headers: { "Content-Type": "application/json" } }
  );

  const token = response.data.token;
  saveToken(token);

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
