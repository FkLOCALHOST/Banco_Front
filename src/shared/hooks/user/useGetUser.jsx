import { useEffect, useState } from "react";
import { getUserById } from "../../../services/api";

const useGetUser = (uid) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uid) {
      setUser(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    getUserById(uid)
      .then((res) => {
        if (res.data && res.data.user) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      })
      .catch((err) => {
        setError(err);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [uid]);

  return { user, loading, error };
};

export default useGetUser;
