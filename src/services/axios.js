import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://www.themealdb.com/api/json/v1/1/",
    headers: { "Content-Type": "application/json" },
});
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.error("Error response:", error);
        return Promise.reject(error);
    }
);