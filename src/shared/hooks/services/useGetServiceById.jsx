import { useState, useCallback } from "react";
import { getServiceById } from "../../../services/api";

const useGetServiceById = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [service, setService] = useState(null);

    const fetchService = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        setService(null);
        try {
            const res = await getServiceById(id);
            if (res.data) {
                setService(res.data);
            } else {
                setError("No se encontró el servicio.");
            }
            return res;
        } catch (e) {
            setError(e.message || "Error al obtener el servicio.");
            return { error: true, message: e.message };
        } finally {
            setLoading(false);
        }
    }, []);

    return { fetchService, service, loading, error };
};

export default useGetServiceById;
