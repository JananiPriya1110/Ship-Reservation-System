import axios from "axios";

// ✅ Create Axios instance
const API = axios.create({
  baseURL: "http://localhost:8080", // Spring Boot backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Optional: Attach token automatically (if you use login auth)
API.interceptors.request.use(
  (req) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {
      req.headers.Authorization = `Bearer ${user.token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// ⚠️ Optional: Handle global errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);

    // If unauthorized, redirect to login
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/admin/login";
    }

    return Promise.reject(error);
  }
);

export default API;