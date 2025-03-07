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
import { AdminEventsPage } from "./pages/admin/AdminEventsPage";
import { SalesPage } from "./pages/organizer/SalesPage";
import {CustomerPage} from "./pages/organizer/CustomerPage";
import { SettingsPage } from "./pages/organizer/SettingsPage";
import { OrganizersPage } from "./pages/admin/OrganizersPage";
import { AdminCustomersPage } from "./pages/admin/AdminCustomersPage";
import RequestsPage from "./pages/admin/RequestsPage";
import { AdminSettingsPage } from "./pages/admin/AdminSettingsPage";
import { EventDetailPage } from "./pages/client/EventDetailPage";
import { EventCheckoutPage } from "./pages/client/EventCheckoutPage";
import EventConfirmationPage  from "./pages/client/EventConfirmationPage";
import Invoice from "./pages/client/Invoice";
import { ProfileLayout } from "./pages/client/ProfileLayout";
import { Booking } from "./pages/client/Booking";
import Setting  from "./pages/client/Setting";
import ErrorPage from "./pages/ErrorPage";



const AppRoutes=()=>{

return(
    <BrowserRouter>
        <Routes>
            <Route element={<AuthWrapper />}>
                <Route element={<ProtectedLayout />} >
                    <Route element={<ClientLayout />} >
                        <Route path="/home" element={<HomePage/>}/>
                        <Route path="/voting" element={<VotingPage />} />
                        <Route path="/event/:id" element={<EventDetailPage />} />
                        <Route path="/event/:id/checkout" element={<EventCheckoutPage />} />
                        <Route path="/event/:id/bookingConfirmed/:id" element={<EventConfirmationPage />} />
                        <Route path="/event/:id/bookingConfirmed/:id/invoice" element={<Invoice />} />

                        <Route path="/profile" element={<ProfileLayout />}>
                            <Route path="bookings" element={<Booking />}/>
                            <Route path="setting" element={<Setting />}/>
                        </Route>
                    </Route>
                
                    <Route path="/organizer" element={<OrganizerLayout />}>
                        <Route path="dashboard" index element={<Dashboard />}/>
                        <Route path="events" index element={<EventsPage />}/>
                        <Route path="sales" index element={<SalesPage />}/>
                        <Route path="customers" index element={<CustomerPage />}/>
                        <Route path="settings" index element={<SettingsPage />}/>
                    </Route> 

                    <Route path="/admin" element={<AdminLayout />}>
                        <Route path="dashboard" index element={<AdminDashboard />}/>
                        <Route path="events" index element={<AdminEventsPage />}/>
                        <Route path="organizers" index element={<OrganizersPage />}/>
                        <Route path="customers" index element={<AdminCustomersPage />}/>
                        <Route path="request" index element={<RequestsPage />}/>
                        <Route path="settings" index element={<AdminSettingsPage />}/>
                    </Route>
                </Route>
                
                <Route element={<AuthLayout />} >
                    <Route path="/login" element={<LoginPage />}/>
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/organizer-signup" element={<OrganizerSignupPage />}  />
                    <Route path="/" element={<LandingPage />}/>
                </Route>

            </Route>

            <Route path="*" element={<ErrorPage />}/>


        </Routes>
  </BrowserRouter>
    )
}

 export default AppRoutes;