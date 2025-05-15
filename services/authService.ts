import axios from "axios";

const API_URL = "https://localhost:7078/api/auth";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  expiration: string;
  userId: string;
  fullName: string;
}

const AuthService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/signin`, credentials);
    return response.data;
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/register`, credentials);
    return response.data;
  },

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    return JSON.parse(userStr);
  },

  getToken() {
    return localStorage.getItem("token");
  },
};

export default AuthService;
