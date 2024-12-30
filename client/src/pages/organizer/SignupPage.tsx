import React from 'react';
import { Link } from 'react-router-dom';
import OrganizerSignupForm from './_components/SignupForm';

interface OrganizerSignupPageProps {
  
}

const OrganizerSignupPage: React.FC<OrganizerSignupPageProps> = () => {
  return (
    <div className='bg-[#F7F2EA] w-[100vw] min-h-[100vh] text-oufit'>
      {/* <img 
        src="https://images.pexels.com/photos/18413963/pexels-photo-18413963/free-photo-of-vintage-camera-and-typewriter.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
        className='w-full h-full z-0 absolute'
        alt="background"
      /> */}
      <div className='flex py-6 flex-col gap-6 relative z-10'>
        <nav className='flex justify-between items-center border-b-[0.25px] border-gray-800 pb-4'>
          <h1 className="text-xl font-semibold pl-4  sm:text-3xl sm:pl-10">
            Ticket Chayo
          </h1>
          <div className='flex gap-5 pr-10'>
            <Link to="/login">
              <button className='p-2 rounded-xl px-4 font-medium border-[#FFC987] border'>
                Login here
              </button>
            </Link>

            <button className='border p-2 bg-[#FFC987] rounded-xl px-4 font-medium'>
              Request Organizer
            </button>
          </div>
        </nav>

        <main className='border min-h-[425px] w-[525px] m-auto bg-white rounded-[50px] mt-16 shadow-md flex flex-col p-4 items-center bg-white/85'>
          <p className='text-3xl font-medium pt-8'>
            Signup as a Organizer
          </p>
          <OrganizerSignupForm />
        </main>
      </div>
    </div>
  );
};

export default OrganizerSignupPage;