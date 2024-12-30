import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/client/SignupPage";
import OrganizerSignupPage from "./pages/organizer/SignupPage";



const AppRoutes=()=>{

return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/organizer-signup" element={<OrganizerSignupPage />}  />
        </Routes>
  </BrowserRouter>
    )
}

 export default AppRoutes;