import { useState } from "react";
import { updateTransaction } from "../../../services/api";

export const useUpdateTransaction = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const updateUserTransaction = async (uid, data) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await updateTransaction(uid, data);

            if (response.error) {
                setError(response.message || "Error al actualizar transacción");
                setSuccess(false);
            } else {
                setSuccess(true);
            }
        } catch (err) {
            setError(err.message || "Error desconocido");
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return { updateUserTransaction, loading, error, success };
};
