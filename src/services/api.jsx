import axios from "axios";

const apiWallet = axios.create({
  baseURL: "http://localhost:3005/walletManager/v1",
  timeout: 9000,
  withCredentials: true, // Permite enviar cookies con cada solicitud
});

apiWallet.interceptors.request.use(
  (config) => {
    if (
      !config.url.includes("/auth/login") &&
      !config.url.includes("/auth/register")
    ) {
      const userCookie = document.cookie.match(/(^| )User=([^;]+)/);
      if (!userCookie) return Promise.reject(new Error("No autorizado"));

      try {
        const user = JSON.parse(decodeURIComponent(userCookie[2]));
        const token = user.token || user.userDetails?.token;
        if (!token) return Promise.reject(new Error("No autorizado"));

        const parts = token.split(".");
        if (parts.length !== 3) throw new Error("Token inválido");

        const payload = JSON.parse(atob(parts[1]));
        const now = Math.floor(Date.now() / 1000);

        if (payload.exp < now) {
          return Promise.reject(new Error("Token expirado"));
        }

        config.headers["Authorization"] = `Bearer ${token}`;
      } catch (error) {
        return Promise.reject(new Error("Token inválido"));
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const register = async (data) => {
  try {
    return await apiWallet.post("/auth/register", data);
  } catch (e) {
    return { error: true, e };
  }
};

export const login = async (data) => {
  try {
    const response = await apiWallet.post("/auth/login", data);
    return response;
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const getUserById = async (uid) => {
  try {
    return await apiWallet.get(`/user/getUserById/${uid}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const getUsers = async () => {
  try {
    return await apiWallet.get("/user/getUser");
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const updatePassword = async (uid, data) => {
  try {
    return await apiWallet.patch(`/user/updatePassword/${uid}`, data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const updateUser = async (uid, data) => {
  try {
    return await apiWallet.patch(`/user/updateUser/${uid}`, data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const deleteUser = async (uid) => {
  try {
    return await apiWallet.patch(`/user/deleteUser/${uid}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const createWallet = async () => {
  try {
    return await apiWallet.get("/wallet/create");
  } catch (error) {
    return { error: true, message: error.message };
  }
};
