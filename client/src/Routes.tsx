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
import AdminDashboard from "./pages/admin/Dashboard";
import VotingPage from "./pages/client/VotingPage";
import { EventsPage } from "./pages/organizer/EventsPage";



const AppRoutes=()=>{

return(
    <BrowserRouter>
        <Routes>
            <Route element={<AuthWrapper />}>
                <Route element={<ProtectedLayout />} >
                    <Route element={<ClientLayout />} >
                        <Route path="/home" element={<HomePage/>}/>
                        <Route path="/voting" element={<VotingPage />} />
                    </Route>
                
                    <Route path="/organizer" element={<OrganizerLayout />}>
                        <Route path="dashboard" index element={<Dashboard />}/>
                        <Route path="events" index element={<EventsPage />}/>
                        <Route path="sales" index element={<p className="text-white p-4">This is Sales page</p>}/>
                        <Route path="customers" index element={<p className="text-white p-4">This is Customer page</p>}/>
                        <Route path="settings" index element={<p className="text-white p-4">This is Settings page</p>}/>
                    </Route> 

                    <Route path="/admin" element={<AdminLayout />}>
                        <Route path="dashboard" index element={<AdminDashboard />}/>
                    </Route>
                </Route>
                
                <Route element={<AuthLayout />} >
                    <Route path="/login" element={<LoginPage />}/>
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/organizer-signup" element={<OrganizerSignupPage />}  />
                    <Route path="/" element={<LandingPage />}/>
                </Route>

            </Route>


        </Routes>
  </BrowserRouter>
    )
}

 export default AppRoutes;