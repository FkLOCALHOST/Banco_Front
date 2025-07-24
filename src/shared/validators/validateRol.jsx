import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const RoleValidator = ({ children, requiredRole = "admin" }) => {
  const [hasValidRole, setHasValidRole] = useState(null);

  useEffect(() => {
    const checkRole = () => {
      try {
        const userCookie = document.cookie
          .split("; ")
          .find(row => row.startsWith("user="));
        
        if (!userCookie) {
          setHasValidRole(false);
          return;
        }

        const userData = JSON.parse(decodeURIComponent(userCookie.split("=")[1]));
        const userRole = userData.role || userData.rol;
        
        setHasValidRole(userRole === requiredRole);
      } catch (error) {
        console.error("Error validating role:", error);
        setHasValidRole(false);
      }
    };

    checkRole();
  }, [requiredRole]);

  if (hasValidRole === null) return null;

  if (!hasValidRole) return <Navigate to="/home" replace />;

  return children;
};

export default RoleValidator;
