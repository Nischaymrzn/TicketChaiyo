import { Outlet } from "react-router";
import { useGetMe } from "@/hooks/useAuth";
import { useAuth } from "@/state-stores/Auth";
import { useEffect } from "react";
 


const AuthWrapper = () => {
  const { handleSetAccessToken, setUser } = useAuth();
  const token = localStorage.getItem("accessToken");
  const response = useGetMe();

    useEffect(() => {
    try {
      if (response.data) {
        handleSetAccessToken(token); 
        setUser(response.data); 
      } else {
        handleSetAccessToken(null); 
        setUser(null); 
      }
    } catch (err) {
      handleSetAccessToken(null); 
      setUser(null); 
    }
  }, [response.data, token, handleSetAccessToken, setUser]);

  return <Outlet />;
};

export default AuthWrapper;