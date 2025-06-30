import { useEffect, useState } from "react";
import { getUserById } from "../services/api";

// Singleton para guardar el rol en memoria
let memoizedRole = null;
let memoizedPromise = null;

function getUidFromCookie() {
  const userCookie = document.cookie.match(/(^| )User=([^;]+)/);
  if (!userCookie) return null;
  try {
    const user = JSON.parse(decodeURIComponent(userCookie[2]));
    return user.uid || user.id || user.userDetails?.uid || null;
  } catch {
    return null;
  }
}

const useUserRole = () => {
  const [role, setRole] = useState(memoizedRole);
  const [loading, setLoading] = useState(!memoizedRole);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (memoizedRole) {
      setRole(memoizedRole);
      setLoading(false);
      return;
    }
    if (!memoizedPromise) {
      const uid = getUidFromCookie();
      if (!uid) {
        setError("No user id");
        setLoading(false);
        return;
      }
      memoizedPromise = getUserById(uid)
        .then((res) => {
          const r = res?.data?.user?.role || null;
          memoizedRole = r;
          setRole(r);
        })
        .catch((e) => {
          setError(e.message || "Error al obtener rol");
        })
        .finally(() => setLoading(false));
    } else {
      memoizedPromise.then(() => {
        setRole(memoizedRole);
        setLoading(false);
      });
    }
  }, []);

  const isAdmin = role === "ADMIN_ROLE";
  return { role, isAdmin, loading, error };
};

export default useUserRole;
