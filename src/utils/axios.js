import axios from 'axios';

const instance = axios.create({
    //baseURL: "https://smartjob-backend-fnhs.onrender.com/api/",
    baseURL:"http://localhost:4000/api",
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

export default instance;
