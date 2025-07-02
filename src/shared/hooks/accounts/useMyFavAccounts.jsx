import { useState } from "react";
import { addFavoriteAccountWallet } from "../../../services/api";

const useMyFavAccounts = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const addFavorite = async (uid, data) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await addFavoriteAccountWallet(uid, data);
            if (response.error || response.data?.success === false) {
                setError(response.message || "Error al modificar favoritos");
                return false;
            } else {
                setSuccess(true);
                return response.data;
            }
        } catch (err) {
            setError(err.message || "Error inesperado");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        addFavorite,
        loading,
        error,
        success,
    };
};

export default useMyFavAccounts;
