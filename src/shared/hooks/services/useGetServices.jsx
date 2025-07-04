import { useEffect, useState } from "react";
import { getServices } from "../../../services/api";

const useGetServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getServices();
        if (res.data && res.data.services) {
          setServices(res.data.services);
        } else {
          setServices([]);
        }
      } catch (e) {
        setError(e);
        setServices([]);
      }
      setLoading(false);
    };
    fetchServices();
  }, []);

  return { services, loading, error };
};

export default useGetServices;
