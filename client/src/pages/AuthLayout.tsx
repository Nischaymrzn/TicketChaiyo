import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/state-stores/Auth";

enum UserRole {
  ADMIN = "admin",
  ORGANIZER = "organizer",
  CLIENT = "client",
}

type Routes = {
  [key in UserRole]: string;
};

const DEFAULT_ROUTES: Routes = {
  [UserRole.ADMIN]: "/admin/dashboard",
  [UserRole.ORGANIZER]: "/organizer/dashboard",
  [UserRole.CLIENT]: "/home",
};

const AuthLayout = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  //@ts-expect-error
  const from = location.state?.from?.pathname || DEFAULT_ROUTES[user?.userRole ?? "client"];
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};

export default AuthLayout;