import { useState, useEffect } from "react";

const getLocalUser = () => {
  const user = localStorage.getItem("User");
  return user ? JSON.parse(user) : null;
};

const useCurrentUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = getLocalUser();
    setUser(localUser);
  }, []);

  return user;
};

export default useCurrentUser;
