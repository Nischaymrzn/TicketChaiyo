import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { AlignJustify, X } from "react-feather";
import SignupForm from "./_components/SignupForm";

const SignupPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <div className="bg-[#F7F2EA] w-full h-full min-h-screen text-outfit relative">
      <img
        src="https://images.pexels.com/photos/18413963/pexels-photo-18413963/free-photo-of-vintage-camera-and-typewriter.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        className="w-full h-full absolute object-cover"
      />
      <div className="relative z-10 flex flex-col gap-6 py-6">

        <nav className="flex justify-between items-center border-b border-gray-300 pb-4 px-10 text-[#FFC987]">
          <h1 className="text-xl font-semibold sm:text-3xl">Ticket Chaiyo</h1>

          <div className="hidden lg:flex gap-5">
            <Link to="/login">
              <button className="p-2 rounded-xl px-4 font-medium border-[#FFC987] border transition text-white">
                Login here
              </button>
            </Link>
            <Link to="/organizer-signup">
              <button className="border p-2 bg-[#FFC987] rounded-xl px-4 font-medium transition hover:bg-[#FFB988] text-black">
                Request Organizer
              </button>
            </Link>
          </div>

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

      
        <main className="border min-h-[425px] w-[90%] mx-auto mt-12 bg-white/85 rounded-[50px] shadow-md flex flex-col items-center p-4 sm:w-[650px] sm:rounded-[25px]">
          <p className="text-3xl font-medium pt-8">Signup to your Account</p>
          <p className='text-gray-900/50 text-sm sm:text-base'>Create your account to get started in just a few steps</p>
          
          <SignupForm />
        </main>
      </div>
    </div>
  );
};

export default SignupPage;