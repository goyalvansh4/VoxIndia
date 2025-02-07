import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { Loader2 } from "lucide-react";
import GlobalAxios from '../../Global/GlobalAxios';
import Cookies from 'js-cookie'


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
        const res = await GlobalAxios.post("/auth/login",
          JSON.stringify(values)
        );
        if(res.data.status === "success"){
          // console.log(res.data.data);
          const {token,userId} = res.data.data;
           Cookies.set("token",token);
           Cookies.set("userId",userId);
           navigate("/")
        }
      } catch (err) {
        setError('Failed to login. Please try again.');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 shadow-lg rounded-xl bg-white">
        <h1 className="text-2xl font-bold text-center mb-4">Login to Your Account</h1>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              {...formik.getFieldProps('email')}
              className="w-full mt-1 p-2 border rounded-md"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              {...formik.getFieldProps('password')}
              className="w-full mt-1 p-2 border rounded-md"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Login"}
          </button>
        </form>
        <p className='text-sm text-right text-blue-500 mt-2'>Forgot Password?</p>
        <p className="text-sm text-center mt-4">
          Don't have an account? <NavLink to="/signup" className="text-blue-500 hover:underline">Sign Up</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;