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

            const response = await getUserTransactions();

            if (response.error) {
                setError(response.message || "Error al obtener usuarios");
                setUsers([]);
            } else if (response.data && Array.isArray(response.data.users)) {
                setUsers(response.data.users);
            } else {
                setUsers([]);
            }

            setLoading(false);
        };

        fetchUsers();
    }, []);

    return { users, loading, error };
};

export default useUserTransaction;
