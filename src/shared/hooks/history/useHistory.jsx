import { useEffect, useState } from "react";
import { getHistoryOfTransactions } from "../../../services/api";

function getUidFromCookie() {
  const userCookie = document.cookie.match(/(^| )User=([^;]+)/);
  if (!userCookie) {
    return null;
  }
  try {
    const user = JSON.parse(decodeURIComponent(userCookie[2]));
    return user.uid || user.id || user.userDetails?.uid || null;
  } catch (e) {
    return null;
  }
}

const useHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const uid = getUidFromCookie();
    if (!uid) {
      setError("No se encontró el usuario.");
      setLoading(false);
      return;
    }
    setLoading(true);
    getHistoryOfTransactions(uid)
      .then((res) => {
        if (res.error) {
          setError(res.message || "Error al obtener historial");
          setHistory([]);
        } else {
          let arr = [];
          if (Array.isArray(res.data?.users)) {
            const user = res.data.users.find((u) => u.uid === uid);
            if (user && Array.isArray(user.historyOfSend)) {
              arr = user.historyOfSend;
            }
          }
          setHistory(arr);
          setError(null);
        }
      })
      .catch((err) => {
        setError(err.message || "Error al obtener historial");
        setHistory([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { history, loading, error };
};

export default useHistory;
