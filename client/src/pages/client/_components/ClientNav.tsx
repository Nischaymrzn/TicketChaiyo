import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { AlignJustify, X } from "react-feather";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLogout } from "@/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";


const ClientNav: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const loggedIn=true;
  const { logout } = useLogout();

  const handleLogout = () =>{
    logout()
  }
  
  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <nav className="sticky top-0 left-0 z-10 pt-4 flex justify-between items-center border-b-[0.25px] border-gray-500 pb-3 sm:pb-3">
      <Link to="/home">
        <h1 className="text-xl font-semibold pl-4 text-[#FFB89F] sm:text-3xl sm:pl-10">
          Ticket Chaiyo
        </h1>
      </Link>

      <ul className="hidden lg:flex gap-8 text-lg">
        <li
          className={`cursor-pointer ${
            isActive("/home") ? "text-[#FFC987] border-b-2 border-[#FFC987]" : "text-white"
          }`}
          onClick={() => navigate("/home")}
        >
          Home
        </li>
        <li
          className={`cursor-pointer ${
            isActive("/event") ? "text-[#FFC987] border-b-2 border-[#FFC987]" : "text-white"
          }`}
          onClick={() => navigate("/event")}
        >
          Events
        </li>
        <li
          className={`cursor-pointer ${
            isActive("/voting") ? "text-[#FFC987] border-b-2 border-[#FFC987]" : "text-white"
          }`}
          onClick={() => navigate("/voting")}
        >
          Voting
        </li>
        <li
          className={`cursor-pointer ${
            isActive("/account/my-booking") ? "text-[#FFC987] border-b-2 border-[#FFC987]" : "text-white"
          }`}
          onClick={() => navigate("/account/my-booking")}
        >
          My Booking
        </li>
      </ul>

      <div className="lg:hidden">
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400 pr-8"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <AlignJustify className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>

      {!loggedIn && (
        <div className="hidden lg:flex gap-2 pr-4 sm:gap-5 sm:pr-10">
          <Link to="/signup">
            <button className="text-sm sm:text-base p-2 rounded-lg px-3 font-medium border-[#FFC987] border text-white sm:rounded-xl sm:px-4">
              Log in
            </button>
          </Link>
          <Link to="/organizer-signup">
            <button className="text-sm sm:text-base border p-2 bg-[#FFC987] text-black rounded-lg px-2 font-medium sm:rounded-xl sm:px-4">
              Register here
            </button>
          </Link>
        </div>
      )}

      {loggedIn && (
        <div className="hidden lg:flex gap-2 pr-4 sm:gap-5 sm:pr-24 ml-24">
          <DropdownMenu>
            <DropdownMenuTrigger>              
            <Avatar>
              <AvatarFallback className="text-black">N</AvatarFallback>
            </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="text-[16px]">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-300"/>
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-200 text-[15px]">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-200 text-[15px]">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bookmark">
                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                  </svg>
                </span>
                My Booking
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-200 text-[15px]">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </span>
                Setting
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-200 text-[15px]" onClick={handleLogout}>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" x2="9" y1="12" y2="12"/>
                  </svg>
                </span>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full border-l-2 border-gray-700 px-6 py-6 overflow-y-auto bg-[#1c1d20] sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-[#FFB89F]">Ticket Chayo</h1>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6">
            <ul className="space-y-4 text-lg">
              <li className="text-white">
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li className="text-white">
                <Link to="/movies" onClick={() => setMobileMenuOpen(false)}>
                  Movies
                </Link>
              </li>
              <li className="text-white">
                <Link to="/events" onClick={() => setMobileMenuOpen(false)}>
                  Events
                </Link>
              </li>
              <li className="text-white">
                <Link to="/concerts" onClick={() => setMobileMenuOpen(false)}>
                  Concert
                </Link>
              </li>
              <li className="text-white">
                <Link to="/my-booking" onClick={() => setMobileMenuOpen(false)}>
                  My Booking
                </Link>
              </li>
            </ul>
            {!loggedIn && (
            <div className="mt-6">
              <Link to="/signup">
                <button className="block w-full px-3 py-2.5 text-base font-medium text-white border border-[#FFC987] rounded-lg hover:border-[#d8a566]">
                  Log in
                </button>
              </Link>
              <Link to="/organizer-signup">
                <button className="block w-full px-3 py-2.5 mt-4 text-base font-medium text-black bg-[#FFC987] rounded-lg hover:bg-[#e5b07e]">
                  Register here
                </button>
              </Link>
            </div>
            )}

            {loggedIn && 
              
              <button className="block w-full px-3 py-2.5 mt-4 text-base font-medium text-black bg-[#FFC987] rounded-lg hover:bg-[#e5b07e]" onClick={handleLogout}>
               Logout
              </button>
           
            }
          </div>
        </Dialog.Panel>
      </Dialog>
    </nav>
  );
};

export default ClientNav;