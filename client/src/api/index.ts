import axios from "axios"

const BASE_URL = "http://localhost:5000/api"

export const publicApi = axios.create({
  baseURL: BASE_URL,
})

const authenticatedApi = axios.create({
  baseURL: BASE_URL,
})

authenticatedApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const setAuthToken = (token: string) => {
  if (token) {
    localStorage.setItem("accessToken", token)
  } else {
    localStorage.removeItem("accessToken")
  }
}

export default authenticatedApi

