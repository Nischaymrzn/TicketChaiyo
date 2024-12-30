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
            {/*
            <Route path="/home" element={<HomePage />} />
            <Route path="/event" element={<EventsPage />} />
            <Route path="/voting" element={<VotingPage />} />
            <Route path="/voting/details" element={<VotingDetailsPage />} />
            <Route path="/event-detail" element={<EventDetailPage  /> }/>
            <Route path="/account">
                <Route path="profile" element={<ClientProfile />}/>
                <Route path="my-booking" element={<Booking />}/>
            </Route> */}
        </Routes>
  </BrowserRouter>
    )
}

 export default AppRoutes;