import { useState, useCallback } from "react";
import { editServices } from "../../../services/api";

const useEditService = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const editService = useCallback(async (id, data) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const res = await editServices(id, data);
            if (res.error) {
                setError(res.message || "Error al actualizar el servicio.");
                return { error: true, message: res.message };
            } else {
                setSuccess(true);
                return res;
            }
        } catch (e) {
            setError(e.message || "Error al actualizar el servicio.");
            return { error: true, message: e.message };
        } finally {
            setLoading(false);
        }
    }, []);

    return { editService, loading, error, success };
};

export default useEditService;
