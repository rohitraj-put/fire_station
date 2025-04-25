import { useState, useEffect, createContext } from "react";
import { toast } from "sonner";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(
        "https://firestationswebaplication-production.up.railway.app/api/v1/users/verifyotp",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const data = await response.json();
      console.log(data);
      setUser(data);
    } catch (error) {
      toast.error("Failed to fetch user details");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};