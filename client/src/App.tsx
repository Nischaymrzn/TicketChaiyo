import AppRoutes from "./Routes"
import { AuthProvider } from "./state-stores/Auth"
import { Toaster } from "@/components/ui/sonner"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { CheckoutProvider } from "./state-stores/CheckoutContext"

const queryClient = new QueryClient()


function App() {
  
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CheckoutProvider>
            <AppRoutes />
            
            <Toaster  position="bottom-right" theme="dark" />
          </CheckoutProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
