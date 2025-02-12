import { Outlet } from "react-router";
import { useGetMe } from "@/hooks/useAuth";
import { useAuth } from "@/state-stores/Auth";
 
const AuthWrapper = () => {
  const { handleSetAccessToken, setUser } = useAuth();
  const token = localStorage.getItem("accessToken");
  const response = useGetMe();


  if(response?.isLoading){
    return <div>...loading</div>
  }

  if (response?.data?.userData) {
    handleSetAccessToken(token);
    setUser(response?.data.userData);
  }
    
  return <Outlet />;
};

export default AuthWrapper;