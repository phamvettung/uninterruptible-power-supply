import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000,
});

// Define endpoints that don't require authentication
const noAuthEndpoints = [
  "/auth/login",
  "/auth/signup",
  "/auth/refresh",
];

// Add request interceptor
api.interceptors.request.use(
  async (config) => {

    // Check if current request URL matches a no-auth endpoint
    const requiresAuth = !noAuthEndpoints.some((endpoint) =>
      config.url.includes(endpoint)
    );
    if (requiresAuth) {

      const token = Cookies.get("access_token") ? JSON.parse(Cookies.get("access_token")) : null;
      if (token && isTokenExpired(token)) {
        try {
          const response = await refreshAccessToken();
        } catch (error) {
          console.error("Token refresh failed", error);
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          window.location.href = "/login"; // Redirect to login page
          return Promise.reject(error);
        }
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;




/**
 * Refresh token
 * @returns Return access token
 * @author PVT (2025-11-18)
 */
const refreshAccessToken = async () => {
    const refreshToken = JSON.parse(Cookies.get("refresh_token"));
    if (!refreshToken) throw new Error('No refresh token');

    const response = await BASE_URL[POST]("/auth/refresh", {"refreshToken":refreshToken});
    Cookies.set('access_token', JSON.stringify(response.data.data.accessToken));

    return response.data.accessToken;
};

/**
 * Check if token is expired
 * @param {*} token 
 * @returns Return true if token is expired
 * @author Tungpv (2025-11-18)
 */
const isTokenExpired = (token) => {
    if (!token) return true;
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
};



