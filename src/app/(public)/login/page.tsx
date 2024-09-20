"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { login } from "@/api/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "@/store/slices/auth.slice";
import { RootState } from "@/store/store";
import { message } from "antd";
// import { message } from "antd"; // Only for notifications, you can use other libraries if preferred

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      // Redirect authenticated users to the dashboard
      router.push("/dashboard");
    }
  }, [user, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await login(data.email, data.password);
      // Dispatch credentials to Redux store
      dispatch(
        setCredentials({
          user: {
            email: response.email,
            name: response.name,
            roles: response.roles,
          },
        })
      );
      message.success("Login successful!");
      router.push("/dashboard"); // Redirect to dashboard or another page
    } catch (error) {
      message.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex w-full md:w-2/3 mx-auto flex-col md:flex-row items-center rounded-2xl justify-center min-h-[400px] bg-white">
      {/* Left side: Info Section */}
      <div className="hidden md:flex flex-col justify-center items-center p-8 w-full md:w-1/2">
        <h2 className="text-3xl font-bold mb-4">Welcome to Library Nest</h2>
        <p className="text-lg text-center max-w-md">
          Manage your libraries with ease. Access a wide range of tools to
          manage book collections, issue management, and more.
        </p>
      </div>

      {/* Right side: Login Form */}
      <div className="flex items-center justify-center p-8 w-full md:w-1/2">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6">Sign In</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <a
                href="/forgot-password"
                className="text-indigo-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
