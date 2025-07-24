// src/shared/hooks/useRevertTransaction.js
import { useState } from "react";
import { revertTransaction } from "../../../services/api";

const useRevertTransaction = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const revert = async (transactionId) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const result = await revertTransaction(transactionId);

            if (result.error) {
                setError(result.message);
                return;
            }

            setSuccess("Transacción revertida con éxito");
            return result.data;
        } catch (err) {
            console.log("Error al revertir transacción:", err);
            setError("Error inesperado al revertir transacción");
        } finally {
            setLoading(false);
        }
    };

    return {
        revert,
        loading,
        error,
        success
    };
};

export default useRevertTransaction;
