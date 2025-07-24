import axios from "axios";

const apiWallet = axios.create({
  baseURL: "https://banco-api-eta.vercel.app/walletManager/v1",
  timeout: 9000,
  withCredentials: true,
});

export const validateToken = async () => {
  try {
    const res = await apiWallet.get("/user/validateToken");
    localStorage.setItem("User", JSON.stringify(res.data.user));
    return res.data.success === true;
  } catch (error) {
    console.warn("Token inválido:", error?.response?.data || error.message);
    return false;
  }
};

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
    const res = await apiWallet.patch(`/user/updatePassword/${uid}`, data);
    return res.data;
  } catch (error) {
    if (error.response?.data?.errors) {
      return {
        error: true,
        message: error.response.data.errors.join(", "),
      };
    }
    return {
      error: true,
      message:
        error.response?.data?.message || error.message || "Error desconocido",
    };
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
    return await apiWallet.post("/wallet/create", data);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

// Productos
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

// Servicios
export const getServices = async () => {
  try {
    return await apiWallet.get("/service/");
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const addService = async (data) => {
  try {
    return await apiWallet.post("/service/agregar", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    return { error: true, message: error.response?.data?.message || error.message };
  }
};

export const updateService = async (id, data) => {
  try {
    return await apiWallet.put(`/service/actualizar/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    return { error: true, message: error.response?.data?.message || error.message };
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

export const editServices = async(id, data) =>{
  try{
    return await apiWallet.put(`/service/actualizar/${id}`,data)
  }catch(error){
    return{
      error: true,
      message: error.message
    }
  }
}

export const getServiceById = async (id) => {
  try{
    return await apiWallet.get(`/service/buscar/${id}`);
  }catch(error){
    return{
      error: true,
      message: error.message
    }
  }
}

// Transacciones
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

// Wallet
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
    return await apiWallet.post(`/user/addFavorite`, data);
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

export const addFavoriteAccountWallet = async (uid, data) => {
  try {
    return await apiWallet.patch(`/wallet/addFavoriteAccount/${uid}`, data);
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
