import { useState } from 'react';
import { addFavoriteAccount } from '../../../services/api';

const useFavAccounts = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const getFavoritesFromStorage = () => {
        try {
            const stored = localStorage.getItem('favoriteAccounts');
            return stored ? JSON.parse(stored) : {};
        } catch {
            return {};
        }
    };

    const saveFavoritesToStorage = (favorites) => {
        try {
            localStorage.setItem('favoriteAccounts', JSON.stringify(favorites));
        } catch (error) {
            console.error('Error saving favorites to localStorage:', error);
        }
    };

    const addFavorite = async (data) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await addFavoriteAccount(data);

            if (response.error) {
                setError(response.message || 'Error al modificar cuenta favorita');
                return false;
            }

            setSuccess(true);

            const currentFavorites = getFavoritesFromStorage();
            const wasAdded = response.message === "Usuario agregado a favoritos";

            if (wasAdded) {
                currentFavorites[data.accountNumber] = true;
            } else {
                delete currentFavorites[data.accountNumber];
            }

            saveFavoritesToStorage(currentFavorites);
            return wasAdded;

        } catch (err) {
            setError(err.message || 'Error inesperado');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const removeFavorite = (accountNumber) => {
        const currentFavorites = getFavoritesFromStorage();
        delete currentFavorites[accountNumber];
        saveFavoritesToStorage(currentFavorites);
    };

    const isFavorite = (accountNumber) => {
        const favorites = getFavoritesFromStorage();
        return !!favorites[accountNumber];
    };

    return {
        addFavorite,
        removeFavorite,
        isFavorite,
        getFavoritesFromStorage,
        loading,
        error,
        success
    };
};

export default useFavAccounts;
