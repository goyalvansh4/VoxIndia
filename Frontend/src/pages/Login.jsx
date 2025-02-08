import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { Loader2, Mail, Lock, LogIn } from "lucide-react";
import GlobalAxios from '../../Global/GlobalAxios';
import Cookies from 'js-cookie';
import { toast, Toaster } from "react-hot-toast";

const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError('');
      try {
        const res = await GlobalAxios.post("/auth/login", JSON.stringify(values));
        if(res.data.status === "success"){
          const { token, userId } = res.data;
          Cookies.set("token", token);
          Cookies.set("userId", userId);
          toast.success("Logged in successfully!");
          navigate("/");
        }
      } catch (err) {
        console.error(err.message)
        setError('Failed to login. Please try again.');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleGoogleLogin = async () => {
    try {
      window.location.href = "http://localhost:3000/api/v1/auth/google";
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 shadow-2xl rounded-2xl bg-white">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h1>
        <Toaster />
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        
        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              {...formik.getFieldProps('email')}
              className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              {...formik.getFieldProps('password')}
              className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-md flex justify-center items-center hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : <LogIn className="mr-2" />} Login
          </button>
        </form>

        {/* Google Login */}
        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full p-3 text-black rounded-md border-2 flex justify-center items-center transition duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
            <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg> <p className='pl-2'>Login with Google</p>
          </button>
        </div>

        <p className="text-sm text-right text-blue-500 mt-2 cursor-pointer hover:underline">Forgot Password?</p>
        
        <p className="text-sm text-center mt-4">
          Don't have an account? <NavLink to="/signup" className="text-blue-500 hover:underline">Sign Up</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;