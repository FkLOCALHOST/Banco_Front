import { useState } from "react";
import { depositTransaction } from "../../../services/api";

const useDepositTransaction = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const executeDeposit = async (data) => {
        setLoading(true);
        setError(null);
        setResult(null);

        const response = await depositTransaction(data);

        if (response.error) {
            setError(response.message || "Ocurrió un error");
        } else {
            setResult(response.data);
        }

        setLoading(false);
    };

    return {
        executeDeposit,
        loading,
        result,
        error,
    };
};

export default useDepositTransaction;