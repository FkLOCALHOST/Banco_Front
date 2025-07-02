import { useState, useEffect } from "react";
import { getHistoryOfTransactions } from "../../../services/api";

export const useHistoryOfTransactions = (uid) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!uid) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await getHistoryOfTransactions(uid);
                if (result.error) {
                    setError(result.message);
                    return;
                }
                
                const userData = result.data?.users?.find(u => u.uid === uid);
                if (userData) {
                    // Procesar transacciones enviadas
                    const sentTransactions = (userData.historyOfSend || []).map(transaction => ({
                        id: transaction._id,
                        type: "send",
                        amount: transaction.amount,
                        sender: transaction.sender,
                        receiver: transaction.receiver,
                        date: transaction.date || transaction.createdAt,
                        status: transaction.status,
                        typeSender: transaction.typeSender,
                        description: transaction.description || `Transferencia ${transaction.typeSender || 'monetaria'}`
                    }));

                    // Procesar transacciones recibidas
                    const receivedTransactions = (userData.historyOfRecive || []).map(transaction => ({
                        id: transaction._id,
                        type: "receive",
                        amount: transaction.amount,
                        sender: transaction.sender,
                        receiver: transaction.receiver,
                        date: transaction.date || transaction.createdAt,
                        status: transaction.status,
                        typeSender: transaction.typeSender,
                        description: transaction.description || `${transaction.typeSender === 'Deposit' ? 'Depósito bancario' : 'Transferencia recibida'}`
                    }));

                    // Combinar y ordenar por fecha (más reciente primero)
                    const allTransactions = [...sentTransactions, ...receivedTransactions];
                    allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
                    
                    setHistory(allTransactions);
                    setError(null);
                } else {
                    setHistory([]);
                }
            } catch (err) {
                setError("Error al obtener historial");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [uid]);

    return { history, loading, error };
};
