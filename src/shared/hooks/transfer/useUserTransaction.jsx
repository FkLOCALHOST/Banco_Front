import { useState, useEffect } from "react";
import { getUserTransactions } from "../../../services/api";

export const useUserTransaction = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await getUserTransactions();
                const data = response?.data;

                console.log("Usuarios recibidos:", data?.users);

                if (data?.success && Array.isArray(data.users)) {
                    setUsers(data.users);
                } else {
                    setUsers([]);
                    setError("No se encontraron usuarios.");
                }
            } catch (err) {
                setError("Error de red o al procesar los datos");
                setUsers([]);
                console.error(err);
            }

            setLoading(false);
        };

        fetchUsers();
    }, []);

    return { users, loading, error };
};

export default useUserTransaction;
