import { useAuth } from "@/state-stores/Auth"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import authenticatedApi, { publicApi, setAuthToken } from "@/api"

export const useSignup = () => {
  const navigate = useNavigate()
  const signupMutation = useMutation({
    mutationFn: async ({
      fullName,
      userName,
      email,
      password,
      userRole,
    }: { fullName: string; userName: string; email: string; password: string; userRole: string }) => {
      const response = await publicApi.post("/auth/register", { fullName, userName, email, password, userRole })
      return response.data
    },
    onSuccess: (response) => {
      toast.success(response.success)
      console.log(response)
      navigate("/login")
    },
    onError: (err) => {
      //@ts-ignore
      toast.error(err?.response?.data?.message)
    },
  })

  const signup = (formData: any) => {
    signupMutation.mutate(formData)
  }

  return {
    signup,
    error: signupMutation.error?.message,
    loading: signupMutation.isPending,
    isSuccess: signupMutation.isSuccess,
    data: signupMutation.data,
  }
}

export const useLogin = () => {
  const navigate = useNavigate()
  const { setUser, handleSetAccessToken } = useAuth()

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await publicApi.post("/auth/login", { email, password })
      return response.data
    },
    onSuccess: (data) => {
      setAuthToken(data.accessToken) // Use the new setAuthToken function
      handleSetAccessToken(data.accessToken)
      setUser(data.user)
      toast.success("Login successful")
      console.log(data)
      if (data.user.userRole == "client") {
        navigate("/home")
      } else if (data.user.userRole == "organizer") {
        navigate("/organizer/dashboard")
      }
    },
    onError: (err) => {
      console.log(err)
      //@ts-ignore
      toast.error(err?.response?.data?.message)
    },
  })

  const login = (email: string, password: string) => {
    loginMutation.mutate({ email, password })
  }

  return {
    login,
    error: loginMutation.error?.message,
    loading: loginMutation.isPending,
  }
}

export const useLogout = () => {
  const navigate = useNavigate()

  const logout = () => {
    setAuthToken("") // Clear the token
    navigate(0)
  }

  return { logout }
}

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await authenticatedApi.get("/auth/getMe")
      return response.data
    },
    enabled: !!localStorage.getItem("accessToken"), // Only run query if token exists
    retry: false,
  })
}

