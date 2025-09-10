import axios from 'axios';
import {logout} from "../slice/RegisterSlice";

const instance = axios.create({
     baseURL: "https://smartjob-backend-fnhs.onrender.com/api/",
    //baseURL:"http://localhost:4000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config; // <- must always return config
    },
    (error) => Promise.reject(error)
);
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            store.dispatch(logout());  
            window.location.href = "/login";  // redirect user
        }
        return Promise.reject(error);
    }
);

export default instance;
