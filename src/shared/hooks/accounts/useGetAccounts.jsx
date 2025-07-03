import { useEffect, useState } from "react";
import { getAccounts } from "../../../services/api";

export const useGetAccounts = (uid) => {
    const [accounts, setAccounts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAccounts = async () => {
        if (!uid) return;

        setLoading(true);
        setError(null);
        try {
            const response = await getAccounts(uid);

            if (response.error) {
                setError(response.message || "Error al obtener cuentas");
                setAccounts(null);
            } else if (response.data?.wallet?.wallet) {
                setAccounts(response.data?.wallet.wallet);
            } else {
                setError("No se encontró información de cuentas.");
                setAccounts(null);
            }
        } catch (err) {
            setError(err.message || "Error desconocido");
            setAccounts(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, [uid]);

    return { accounts, loading, error };
};
