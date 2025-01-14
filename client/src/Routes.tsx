import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/client/SignupPage";
import OrganizerSignupPage from "./pages/organizer/SignupPage";
import HomePage from "./pages/client/HomePage";
import AuthWrapper from "./pages/AuthWrapper";
import AuthLayout from "./pages/AuthLayout";
import ProtectedLayout from "./pages/ProtectedLayout";



const AppRoutes=()=>{

return(
    <BrowserRouter>
        <Routes>
            <Route element={<AuthWrapper />}>
                <Route element={<ProtectedLayout />} >
                    <Route path="/home" element={<HomePage/>}/>
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