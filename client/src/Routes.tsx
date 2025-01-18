import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/client/SignupPage";
import OrganizerSignupPage from "./pages/organizer/SignupPage";
import HomePage from "./pages/client/HomePage";
import AuthWrapper from "./pages/AuthWrapper";
import AuthLayout from "./pages/AuthLayout";
import ProtectedLayout from "./pages/ProtectedLayout";
import ClientLayout from "./pages/ClientLayout";
import OrganizerLayout from "./pages/OrganizerLayout";
import Dashboard from "./pages/organizer/Dashboard";
import AdminLayout from "./pages/AdminLayout";
import AdminDashboard from "./pages/organizer/Dashboard";



const AppRoutes=()=>{

return(
    <BrowserRouter>
        <Routes>
            <Route element={<AuthWrapper />}>
                <Route element={<ProtectedLayout />} >
                    <Route element={<ClientLayout />} >
                        <Route path="/home" element={<HomePage/>}/>
                        <Route path="/voting" element={<HomePage />} />
                    </Route>
                
                    <Route path="/organizer" element={<OrganizerLayout />}>
                        <Route path="dashboard" index element={<Dashboard />}/>
                    </Route>

                    <Route path="/admin" element={<AdminLayout />}>
                        <Route path="dashboard" index element={<AdminDashboard />}/>
                    </Route>

                </Route>

                <Route element={<AuthLayout />} >
                    <Route path="/login" element={<LoginPage />}/>
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/organizer-signup" element={<OrganizerSignupPage />}  />
                </Route>

                <Route path="/" element={<LandingPage />}/>

            </Route>
        </Routes>
  </BrowserRouter>
    )
}

 export default AppRoutes;