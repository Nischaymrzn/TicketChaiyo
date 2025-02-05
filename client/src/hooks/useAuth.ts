import { useAuth } from "@/state-stores/Auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const useSignup = () => {
  const navigate = useNavigate()
  const signupMutation = useMutation({
    mutationFn: async ({ fullName, userName, email, password, userRole }: { fullName: string; userName:string; email: string; password: string; userRole: string }) => {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        { fullName, userName, email, password, userRole },
        { headers: { 'Content-Type': 'application/json' } }
      );
      return response.data;
    },
    onSuccess: (response) => {
      toast.success(response.success)
      console.log(response)
      navigate('/login')
    },
    onError: (err) => {
      //@ts-ignore
      toast.error(err?.response.data.message)
    }
  });

  const signup = (formData: any) => {
    signupMutation.mutate(formData) ;
  };

  return {
    signup,
    error: signupMutation.error?.message,
    loading: signupMutation.isPending, 
    isSuccess: signupMutation.isSuccess,
    data: signupMutation.data
  };
};

const useLogin = () => {
  const navigate = useNavigate();
  const { setUser, handleSetAccessToken }  = useAuth()

  const loginMutation = useMutation({
      mutationFn: async ({ email, password } : {email:string, password:string}) => {
          const response = await axios.post(
              'http://localhost:5000/api/auth/login',
              { email, password },
              { headers: { 'Content-Type': 'application/json' } }
          );
          return response.data;
      },
      onSuccess: (data) => {
        handleSetAccessToken(data.accessToken); 
        setUser(data.user);
        localStorage.setItem('accessToken',data.accessToken)
        toast.success("Login successfully")
        console.log(data)
        if(data.user.userRole == "client"){
          navigate("/home")
        }else if(data.user.userRole == "organizer"){
          navigate("/organizer/dashboard")
        }
      },
  });

  const login = (email:string, password:string) => {
      loginMutation.mutate({ email, password });
  };

  return {
      login,
      error: loginMutation.error?.message,
      loading: loginMutation.isPending
  };
};

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate(0); 
  };

  return { logout };
};

const useGetMe = () => {
  const token = localStorage.getItem("accessToken");

  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/api/auth/getMe", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    enabled: !!token, // Only run query if token exists
    retry: false,
  });
};

export { useSignup, useGetMe, useLogin, useLogout };
