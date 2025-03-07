import { Link } from "react-router-dom";
import errorImage from "@/assets/error.png";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-20 font-primary">
      <img
        src={errorImage}
        alt="error loading image"
        className="w-[40rem]"
      />

      <div className="flex flex-col justify-center items-center lg:w-[32rem] min-h-[7rem] pt-[2rem] gap-[4px] mx-3">
        <p className="font-semibold ">404 Not Found</p>

        <p className="text-[1.5rem] pb-3 font-secondary">
          Oops! Page not found
        </p>

        <p className="text-[14px] text-center text-gray-500 font-secondary pb-3">
          The page you are trying to access doesnot exist or has been moved. Try
          going back to our homepage.
        </p>

        <Link to="/">
          <button className=" bg-[#FFC987] rounded-lg py-2 px-4 font-medium">
            Go to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;