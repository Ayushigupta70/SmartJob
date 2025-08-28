import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:4000/api/user",
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);
    if (token && !config.url.includes("login") && !config.url.includes("register")) {
    config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export default instance;