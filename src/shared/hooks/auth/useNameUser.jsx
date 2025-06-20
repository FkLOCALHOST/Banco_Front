import { useState, useEffect } from "react";

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
};

const useCurrentUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userCookie = getCookie("User");
    if (userCookie) {
      try {
        const parsedUser = JSON.parse(userCookie);
        setUser(parsedUser);
      } catch (error) {
        setUser(null);
      }
    }
  }, []);

  return user;
};

export default useCurrentUser;
