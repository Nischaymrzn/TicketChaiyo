import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { z } from "zod";
import { organizerSignupFormSchema } from "../_schema";

// Infer the type from the zod schema
type FormValues = z.infer<typeof organizerSignupFormSchema>;

const OrganizerSignupForm: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(organizerSignupFormSchema),
  });

  const handleSignup = async (value: FormValues): Promise<void> => {
    let updatedData = [];
    const storedData = localStorage.getItem("test");

    if (storedData) {
      updatedData = JSON.parse(storedData);
      if (storedData.includes(JSON.stringify(value))) {
        console.log("Account already exists");
        return;
      }
    }

    updatedData = [...updatedData, value];
    console.log(updatedData);
    localStorage.setItem("test", JSON.stringify(updatedData));
  };

  return (
    <form
      className="w-full p-6 sm:p-10 sm:pt-7 gap-3 sm:gap-4"
      onSubmit={handleSubmit(handleSignup)}
    >
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm sm:text-md font-medium leading-5 sm:leading-6 text-gray-900"
        >
          Full Name
        </label>
        <div className="mt-1 sm:mt-2">
          <Input
            type="text"
            placeholder="Nischay Maharjan"
            id="fullName"
            {...register("fullName")}
            className={cn(
              "block w-full py-3 sm:py-5 bg-white text-gray-900 shadow-sm placeholder:text-gray-400 text-sm sm:text-base sm:leading-6"
            )}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs sm:text-sm text-error">
              {errors.fullName.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="mt-3 sm:mt-4">
        <label
          htmlFor="userName"
          className="block text-sm sm:text-md font-medium leading-5 sm:leading-6 text-gray-900"
        >
          Username
        </label>
        <div className="mt-1 sm:mt-2">
          <Input
            type="text"
            placeholder="Nischay"
            id="userName"
            {...register("userName")}
            className={cn(
              "block w-full py-3 sm:py-5 bg-white text-gray-900 shadow-sm placeholder:text-gray-400 text-sm sm:text-base sm:leading-6"
            )}
          />
          {errors.userName && (
            <p className="mt-1 text-xs sm:text-sm text-error">
              {errors.userName.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="mt-3 sm:mt-4">
        <label
          htmlFor="organizationName"
          className="block text-sm sm:text-md font-medium leading-5 sm:leading-6 text-gray-900"
        >
          Organization Name
        </label>
        <div className="mt-1 sm:mt-2">
          <Input
            type="text"
            placeholder="Organization Name"
            id="organizationName"
            {...register("organizationName")}
            className={cn(
              "block w-full py-3 sm:py-5 bg-white text-gray-900 shadow-sm placeholder:text-gray-400 text-sm sm:text-base sm:leading-6"
            )}
          />
          {errors.organizationName && (
            <p className="mt-1 text-xs sm:text-sm text-error">
              {errors.organizationName.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="mt-3 sm:mt-4">
        <label
          htmlFor="email"
          className="block text-sm sm:text-md font-medium leading-5 sm:leading-6 text-gray-900"
        >
          Email
        </label>
        <div className="mt-1 sm:mt-2">
          <Input
            type="email"
            placeholder="nischay@gmail.com"
            id="email"
            {...register("email")}
            className={cn(
              "block w-full py-3 sm:py-5 bg-white text-gray-900 shadow-sm placeholder:text-gray-400 text-sm sm:text-base sm:leading-6"
            )}
          />
          {errors.email && (
            <p className="mt-1 text-xs sm:text-sm text-error">
              {errors.email.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="mt-3 sm:mt-4">
        <label
          htmlFor="password"
          className="block text-sm sm:text-md font-medium leading-5 sm:leading-6 text-gray-900"
        >
          Password
        </label>
        <div className="mt-1 sm:mt-2">
          <Input
            type="password"
            placeholder="Password"
            id="password"
            {...register("password")}
            className={cn(
              "block w-full py-3 sm:py-5 bg-white text-gray-900 shadow-sm placeholder:text-gray-400 text-sm sm:text-base sm:leading-6"
            )}
          />
          {errors.password && (
            <p className="mt-1 text-xs sm:text-sm text-error">
              {errors.password.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 sm:mt-5">
        <button
          type="submit"
          className="flex w-full items-center gap-2 bg-[#FFC987] justify-center rounded-md px-2.5 py-2 sm:px-3 sm:py-2.5 text-sm sm:text-md font-semibold shadow-sm hover:bg-[#FFB988] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition ease-in-out"
        >
          Sign Up
        </button>
      </div>

      <div className="mt-4 sm:mt-5 text-center">
        <p className="text-xs sm:text-sm">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-red-400 font-medium hover:text-red-500 hover:underline">
              Login here
            </span>
          </Link>
        </p>
      </div>
    </form>
  );
};

export default OrganizerSignupForm;