import { useState, useCallback } from 'react';
import { createWallet } from '../../../services/api';

export const useCreateWallet = () => {
    const [walletData, setWalletData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const create = useCallback(async (data = {}) => {
        setLoading(true);
        setError(null);
        setWalletData(null);

        const response = await createWallet(data);

        if (response.error) {
            setError(response.message);
        } else {
            setWalletData(response.data);
        }

        setLoading(false);
    }, []);

    const reset = () => {
        setWalletData(null);
        setError(null);
        setLoading(false);
    };

    return {
        createWallet: create,
        walletData,
        error,
        loading,
        reset,
    };
};
