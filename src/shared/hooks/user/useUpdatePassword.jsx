import { useState } from "react";
import { updatePassword } from "../../../services/api";

const useUpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const changePassword = async (uid, newPassword) => {
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await updatePassword(uid, { newPassword });
      if (res.error) throw new Error(res.message);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading, error, success };
};

export default useUpdatePassword;
