import axios from "axios";
import { useState, useEffect } from "react";

export default function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const adminRes = await axios.get("http://localhost:4004/api/admin/auth");
        if (adminRes.data) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error(error)
      }
    })();
  }, []);

  return isAdmin;
}