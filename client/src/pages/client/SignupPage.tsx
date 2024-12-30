import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { AlignJustify, X } from "react-feather";
import SignupForm from "./_components/SignupForm";

interface SignupPageProps {
  // Add props here if needed in the future
}

const SignupPage: React.FC<SignupPageProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <div className="bg-[#F7F2EA] w-full h-full min-h-screen text-outfit relative">
      {/* Background Image */}
      <img
        src="https://images.pexels.com/photos/18413963/pexels-photo-18413963/free-photo-of-vintage-camera-and-typewriter.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        className="w-full h-full absolute object-cover"
        alt="Background of vintage camera and typewriter"
      />

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col gap-6 py-6">
        {/* Navbar */}
        <nav className="flex justify-between items-center border-b border-gray-100 pb-4 px-10">
          <h1 className="text-xl font-semibold text-[#FFB89F] sm:text-3xl">Ticket Chayo</h1>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-5">
            <Link to="/login">
              <button className="p-2 rounded-xl px-4 font-medium border-[#FFC987] border text-white transition hover:bg-[#FFC987] hover:text-black">
                Login here
              </button>
            </Link>
            <Link to="/organizer-signup">
              <button className="border p-2 bg-[#FFC987] rounded-xl px-4 font-medium transition hover:bg-[#FFB988]">
                Request Organizer
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
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    Login here
                  </Link>
                </li>
                <li className="text-white">
                  <Link to="/organizer-signup" onClick={() => setMobileMenuOpen(false)}>
                    Request Organizer
                  </Link>
                </li>
              </ul>
            </div>
          </Dialog.Panel>
        </Dialog>

        {/* Main Content */}
        <main className="border min-h-[425px] w-[90%] max-w-[525px] mx-auto mt-20 bg-white/85 rounded-[50px] shadow-md flex flex-col items-center p-4">
          <p className="text-3xl font-medium pt-8">Signup to your Account</p>
          {/* Client Signup Form */}
          <SignupForm />
        </main>
      </div>
    </div>
  );
};

export default SignupPage;