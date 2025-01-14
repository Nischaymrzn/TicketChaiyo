import AppRoutes from "./Routes"
import { AuthProvider } from "./state-stores/Auth"
import { Toaster } from "@/components/ui/sonner"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()


function App() {
  
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRoutes />
            <Toaster  position="bottom-right" theme="dark" />
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
