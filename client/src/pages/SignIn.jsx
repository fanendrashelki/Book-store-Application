import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [showpassword, setShowpassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/sign-in`, formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.id);
      toast.success(response.data.message || "Login successful!");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong. Try again!"
      );
    }
  };
  return (
    <div className="flex justify-center items-center h-dvh  my-auto  ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold text-center mb-4">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="Password"
            >
              Password
            </label>
            <input
              type={showpassword ? "text" : "password"}
              id="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 "
            />
            <span
              className="absolute right-3 bottom-3 cursor-pointer"
              onClick={() => setShowpassword(!showpassword)}
            >
              {showpassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>
          <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition">
            Sign In
          </button>
        </form>
        <div className="mt-5">
          Don't have an account?
          <Link to="/sign-up" className="text-emerald-600">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
