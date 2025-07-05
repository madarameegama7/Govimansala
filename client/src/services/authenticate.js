import axios from "axios";

const saveToken=(token)=>{
    localStorage.setItem("authToken",token);
};

export const loginApi = async (email,password)=>{
    const response = await axios.post("/auth/login",{
        email,
        password,
    });

    const token = response.data.token;
    saveToken(token);

    return response;
}