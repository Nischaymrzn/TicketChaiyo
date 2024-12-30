import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/client/SignupPage";
import OrganizerSignupPage from "./pages/organizer/SignupPage";
import HomePage from "./pages/client/HomePage";



const AppRoutes=()=>{

return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/organizer-signup" element={<OrganizerSignupPage />}  />
            <Route path="/home" element={<HomePage/>}/>
        </Routes>
  </BrowserRouter>
    )
}

 export default AppRoutes;