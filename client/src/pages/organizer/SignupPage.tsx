import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { AlignJustify, X } from "lucide-react";
import OrganizerSignupForm from "./_components/SignupForm";

const OrganizerSignupPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-[#F7F2EA] w-full h-full min-h-screen text-outfit relative">
      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col gap-6 py-6">
        {/* Navbar */}
        <nav className="flex justify-between items-center border-b border-gray-300 pb-4 px-6 sm:px-10">
          <h1 className="text-xl font-semibold sm:text-3xl">Ticket Chaiyo</h1>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-5">
            <Link to="/login">
              <button className="p-2 rounded-xl px-4 font-medium border-[#FFC987] border transition hover:text-black">
                Login here
              </button>
            </Link>
            <Link to="/signup">
              <button className="border p-2 bg-[#FFC987] rounded-xl px-4 font-medium transition hover:bg-[#FFB988]">
                Client Signup
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <AlignJustify className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50 bg-black/30" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full border-l-2 border-gray-700 px-6 py-6 overflow-y-auto bg-[#1c1d20] sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-[#FFB89F]">
                Ticket Chaiyo
              </h1>
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
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    Login here
                  </Link>
                </li>
                <li className="text-white">
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    Client Signup
                  </Link>
                </li>
              </ul>
            </div>
          </Dialog.Panel>
        </Dialog>

        {/* Main Content */}
        <main className="border min-h-[400px] w-[90%] mx-auto mt-6 bg-white/85 rounded-[50px] shadow-md flex flex-col items-center p-4 py-3 sm:w-[700px] sm:rounded-[25px]">
          <p className="text-2xl sm:text-3xl font-medium pt-6 sm:pt-8 text-center">
            Register as an Organizer
          </p>
          <p className="text-gray-900/50 text-sm sm:text-base text-center px-4">
            Create your organizer account to start hosting events
          </p>
          {/* Organizer Signup Form Component */}
          <OrganizerSignupForm />
        </main>
      </div>
    </div>
  );
};

export default OrganizerSignupPage;