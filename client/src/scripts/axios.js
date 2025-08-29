import axios from "axios";
console.log("Backend URL:", import.meta.env.VITE_RENDER_URL);
const api = axios.create({
    baseURL: import.meta.env.VITE_RENDER_URL,
    withCredentials: true,
});

export default api;

