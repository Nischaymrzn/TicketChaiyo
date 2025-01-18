import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/state-stores/Auth";

const AuthLayout = () => {
  const { isAuthenticated,user } = useAuth();

  if (isAuthenticated) {
    if (user?.userRole == "client"){
      return <Navigate to="/home" replace />;
    }
    else if (user?.userRole == "organizer"){
      return <Navigate to="/organizer/dashboard" replace />;
    }
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
