import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { Loader2, LogIn, Mail, Lock, User, Github, Circle } from "lucide-react";
import GlobalAxios from "../../Global/GlobalAxios";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

const SignUp = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError("");
      try {
        const response = await GlobalAxios.post("/auth/signup", JSON.stringify(values));

        if (response.data.status === "success") {
          toast.success(response.data.message);
          navigate("/login");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to SignUp. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleGoogleSignup = async () => {
    try {
      window.location.href = "http://localhost:3000/api/v1/auth/google"; // Redirect to backend route
    } catch (error) {
      console.error("Google signup error:", error);
      toast.error("Google signup failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 shadow-lg rounded-xl bg-white">
        <h1 className="text-3xl font-bold text-center mb-4">Create Account</h1>
        <Toaster />
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        {/* Signup Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                {...formik.getFieldProps("name")}
                className="w-full mt-1 p-2 pl-10 border rounded-md"
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                {...formik.getFieldProps("email")}
                className="w-full mt-1 p-2 pl-10 border rounded-md"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-500" />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                {...formik.getFieldProps("password")}
                className="w-full mt-1 p-2 pl-10 border rounded-md"
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md flex justify-center items-center hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
          </button>
        </form>

        {/* OR Separator */}
        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Sign Up with Google Button */}
        <button
          onClick={handleGoogleSignup}
          className="w-full p-2 flex items-center justify-center gap-2 border rounded-md hover:bg-gray-200 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
            <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>Sign Up with Google
        </button>

        {/* Redirect to Login */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-500 hover:underline">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUp;