import axios from "axios";

const saveToken=(token)=>{
    localStorage.setItem("accessToken",token);
};

export const loginApi = async (email, password) => {
    const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password }, 
        { headers: { "Content-Type": "application/json" } }
    );

    const token = response.data.token;
    saveToken(token);

    return response;
};

export const signupApi=async(signupData)=>{
    const response=await axios.post(
        "http://localhost:8080/api/auth/register",
        signupData,
        {headers:{"Content-Type":"application/json"}}
    );
    return response;
};