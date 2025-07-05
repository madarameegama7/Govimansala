import axios from "axios";

const saveToken=(token)=>{
    localStorage.setItem("authToken",token);
};

export const loginApi = async (email, password) => {
    const response = await axios.post(
        "http://localhost:8081/api/auth/login",
        { email, password }, // <-- send as data
        { headers: { "Content-Type": "application/json" } }
    );

    const token = response.data.token;
    saveToken(token);

    return response;
};