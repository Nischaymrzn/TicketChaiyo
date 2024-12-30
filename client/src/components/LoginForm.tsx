import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import formSchema from "@/schemas/formSchema";
import { Input } from "./ui/input";
import { Link, useNavigate } from "react-router";
import { z } from "zod";

type FormValues = z.infer<typeof formSchema>;

// Interface for the test data structure
interface TestData {
  userName: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();

  const handleLogin = async (value: FormValues) => {
    const testData = JSON.parse(localStorage.getItem("test") || "[]") as TestData[];
    let isLoggedIn = false;

    testData.forEach((data) => {
      if (data.userName === value.userName && data.password === value.password) {
        isLoggedIn = true;
      }
    });

    if (!isLoggedIn) {
      console.log("Invalid");
      return;
    }

    navigate("/home");
  };

  return (
    <form className="w-full p-4 gap-2 sm:gap-6 sm:p-10" onSubmit={handleSubmit(handleLogin)}>
      <div>
        <label
          htmlFor="userName"
          className="block text-sm sm:text-base font-medium leading-6 text-gray-900"
        >
          Username
        </label>

        <div className="mt-1 sm:mt-2">
          <Input
            type="text"
            placeholder="nischay"
            id="userName"
            {...register("userName")}
            className={cn(
              "block w-full py-3 sm:py-5 bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-base sm:leading-6"
            )}
          />

          {errors.userName && (
            <p className="mt-1 text-sm text-error">{errors.userName?.message}</p>
          )}
        </div>
      </div>

      <div className="mt-3 sm:mt-4">
        <label
          htmlFor="password"
          className="block text-sm sm:text-base font-medium leading-6 text-gray-900"
        >
          Password
        </label>

        <div className="mt-1 sm:mt-2">
          <Input
            type="password"
            id="password"
            {...register("password")}
            className={cn(
              "block w-full py-3 sm:py-5 bg-white text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-base sm:leading-6"
            )}
          />

          {errors.password && (
            <p className="mt-1 text-sm text-error">{errors.password?.message}</p>
          )}
        </div>
      </div>

      <div className="mt-4 sm:mt-6">
        <button
          type="submit"
          className="flex w-full items-center gap-2 bg-[#FFC987] justify-center rounded-md px-3 py-3 sm:py-2.5 text-sm sm:text-base font-semibold shadow-sm hover:bg-[#FFB988] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition ease-in-out"
        >
          Log in
        </button>
      </div>

      <div className="mt-6 text-center text-sm sm:text-base">
        <p>
          Don't have an account?{' '}
          <span className="pl-1">
            <Link to="/signup">
              <span className="text-red-400 font-medium hover:text-red-500 hover:underline text-sm sm:text-base">
                Register here
              </span>
            </Link>
          </span>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;