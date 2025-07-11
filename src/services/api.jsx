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
        return Promise.reject(new Error(`Error al procesar el token: ${error.message} `));
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

export const createWallet = async (data) => {
  try {
    return await apiWallet.post("/wallet/create",data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

// PRODUCTOS
export const getProducts = async () => {
  try {
    return await apiWallet.get("/product/");
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const addProduct = async (data) => {
  try {
    return await apiWallet.post("/product/agregar", data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const updateProduct = async (id, data) => {
  try {
    return await apiWallet.put(`/product/actualizar/${id}`, data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const toggleProduct = async (id) => {
  try {
    return await apiWallet.patch(`/product/desactivar/${id}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const searchProduct = async (name) => {
  try {
    return await apiWallet.get(`/product/buscar/${name}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const assignProduct = async (data) => {
  try {
    return await apiWallet.post("/product/asignar", data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const deleteProductFromUser = async (data) => {
  try {
    return await apiWallet.delete("/product/eliminar", { data });
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const getUserProducts = async (userId) => {
  try {
    return await apiWallet.get(`/product/usuario/${userId}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

// SERVICIOS
export const getServices = async () => {
  try {
    return await apiWallet.get("/service/");
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const addService = async (data) => {
  try {
    return await apiWallet.post("/service/agregar", data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const updateService = async (id, data) => {
  try {
    return await apiWallet.put(`/service/actualizar/${id}`, data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const toggleService = async (id) => {
  try {
    return await apiWallet.patch(`/service/desactivar/${id}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const searchService = async (name) => {
  try {
    return await apiWallet.get(`/service/buscar/${name}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const assignService = async (data) => {
  try {
    return await apiWallet.post("/service/asignar", data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const deleteServiceFromUser = async (data) => {
  try {
    return await apiWallet.delete("/service/eliminar", { data });
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const getUserServices = async (userId) => {
  try {
    return await apiWallet.get(`/service/usuario/${userId}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

// TRANSACCIONES
export const createTransaction = async (data) => {
  try {
    return await apiWallet.post("/transaction/createTransaction", data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const revertTransaction = async (uid) => {
  try {
    return await apiWallet.patch(`/transaction/revertTransaction/${uid}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const depositTransaction = async (data) => {
  try {
    return await apiWallet.post("/transaction/depositTransaction", data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const updateDeposit = async (uid, data) => {
  try {
    return await apiWallet.patch(`/transaction/updateDeposit/${uid}`, data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const updateTransaction = async (uid, data) => {
  try {
    return await apiWallet.patch(`/transaction/updateTransaction/${uid}`, data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

// WALLET
export const getWalletBalances = async (userId) => {
  try {
    return await apiWallet.get(`/wallet/balances/${userId}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const getWalletMovements = async (userId) => {
  try {
    return await apiWallet.get(`/wallet/movements/${userId}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const addFavoriteAccount = async (data) => {
  try {
    return await apiWallet.post(`/user/addFavorite`,data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const getHistoryOfTransactions = async (uid) => {
  try {
    return await apiWallet.get(`/user/getHistoryOfTransactions/${uid}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const getTransactionById = async (transactionId) => {
  try {
    return await apiWallet.get(`/transaction/getTransaction/${transactionId}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const getAccounts = async (uid) => {
  try {
    return await apiWallet.get(`/user/getWallet/${uid}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const addFavoriteAccountWallet = async (uid,data) => {
  try {
    return await apiWallet.patch(`/wallet/addFavoriteAccount/${uid}`,data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const getUserTransactions = async () => {
  try {
    return await apiWallet.get(`/user/getUserTransactions`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

