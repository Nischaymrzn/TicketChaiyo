import LoginForm from '@/components/LoginForm';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { AlignJustify, X } from 'react-feather';

interface LoginPageProps {
  
}

const LoginPage: React.FC<LoginPageProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <div className="bg-[#F7F2EA] min-w-[100vw] min-h-[100vh] text-outfit">
      {/* <img
        src="https://images.pexels.com/photos/18413963/pexels-photo-18413963/free-photo-of-vintage-camera-and-typewriter.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        className="w-full h-full z-0 absolute"
        // alt="background" text-[#FFB89F]
      /> */}
      <div className="flex py-4 flex-col gap-4 relative z-10 sm:py-6 sm:gap-6">
        <nav className="flex justify-between items-center border-b-[0.25px] border-gray-800 pb-3 sm:pb-4">
          <h1 className="text-xl font-semibold pl-4  sm:text-3xl sm:pl-10">
            Ticket Chayo
          </h1>
          {/* Desktop Actions */}
          <div className="hidden lg:flex gap-2 pr-4 sm:gap-5 sm:pr-10">
            <Link to="/signup">
              <button className="text-sm sm:text-base p-2 rounded-lg px-3 font-medium border-[#FFC987] border text-black sm:rounded-xl sm:px-4">
                Sign up
              </button>
            </Link>
            <Link to="/organizer-signup">
              <button className="text-sm sm:text-base border p-2 bg-[#FFC987] rounded-lg px-2 font-medium sm:rounded-xl sm:px-4">
                Request Organizer
              </button>
            </Link>
          </div>
          {/* Mobile Menu Toggle Button */}
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
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                      Sign up
                    </Link>
                  </li>
                  <li className="text-white">
                    <Link
                      to="/organizer-signup"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Request Organizer
                    </Link>
                  </li>
                </ul>
              </div>
            </Dialog.Panel>
          </Dialog>
        </nav>

        <main className="border min-h-[250px] w-[350px] m-auto bg-white rounded-[30px] mt-24 shadow-md flex flex-col p-3 items-center bg-white/80 sm:min-h-[425px] sm:w-[525px] sm:rounded-[50px] sm:mt-32 sm:p-4">
          <p className="text-[24px] font-medium pt-4 sm:text-3xl sm:pt-8">
            Login to your Account
          </p>
          <LoginForm />
        </main>
      </div>
    </div>
  );
};

export default LoginPage;