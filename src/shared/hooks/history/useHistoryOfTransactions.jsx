import { useState, useEffect } from "react";
import { getHistoryOfTransactions, getTransactionById } from "../../../services/api";

export const useHistoryOfTransactions = (uid) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!uid) return;

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
                    const transactionIds = [
                        ...userData.historyOfSend.map(id => ({ id, type: "send" })),
                        ...userData.historyOfRecive?.map(id => ({ id, type: "receive" })) || []
                    ];
                    
                    const detailedTransactions = await Promise.all(
                        transactionIds.map(async (tx) => {
                            try {
                                const transactionResult = await getTransactionById(tx.id);
                                if (transactionResult.error) {
                                    return {
                                        id: tx.id,
                                        type: tx.type,
                                        amount: 0,
                                        sender: "Desconocido",
                                        receiver: "Desconocido",
                                        date: new Date().toISOString(),
                                        description: "Error al cargar"
                                    };
                                }
                                const transactionData = transactionResult.data?.transaction;
                                return {
                                    id: tx.id,
                                    type: tx.type,
                                    amount: transactionData?.amount || 0,
                                    sender: transactionData?.sender || "Desconocido",
                                    receiver: transactionData?.receiver || "Desconocido", 
                                    date: transactionData?.createdAt || new Date().toISOString(),
                                    description: transactionData?.description || "Sin descripción"
                                };
                            } catch (err) {
                                console.error(`Error fetching transaction ${tx.id}:`, err);
                                return {
                                    id: tx.id,
                                    type: tx.type,
                                    amount: 0,
                                    sender: "Desconocido",
                                    receiver: "Desconocido",
                                    date: new Date().toISOString(),
                                    description: "Error al cargar"
                                };
                            }
                        })
                    );
                    
                    detailedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
                    setHistory(detailedTransactions);
                } else {
                    setHistory([]);
                }
            } catch (err) {
                setError("Error al obtener historial");
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [uid]);

    return { history, loading, error };
};
