import { useState } from "react";
import { updateUser } from "../../../services/api";

const useEditUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const editUser = async (uid, data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await updateUser(uid, data);
      if (res.data && res.data.success) {
        setSuccess(true);
      } else {
        setError(res.data?.message || "Error al actualizar usuario");
      }
      return res;
    } catch (e) {
      setError(e.message || "Error al actualizar usuario");
      return { error: true, message: e.message };
    } finally {
      setLoading(false);
    }
  };

  return { editUser, loading, error, success };
};

export default useEditUser;
