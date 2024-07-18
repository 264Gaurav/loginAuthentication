// src/components/RegisterForm.js
import toast from 'react-hot-toast';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const RegisterForm = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone:null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword ,phone} = user;
    
    // Validation
    if (name && email && password && confirmPassword && phone) {
      if (password === confirmPassword) {
        try {
          const res = await axios.post(`${SERVER_URL}/auth/signup`, user);
          toast.success(res.data.message);
          navigate('/login');
        } catch (err) {
          toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
        }
      } else {
        toast.error('Password and confirm password do not match.');
      }
    } else {
      toast.error('All fields are required.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="w-96 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-2">Register</h2>

        <div className="mb-2">
          <label htmlFor="name" className="block font-semibold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter your name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="block font-semibold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="phone" className="block font-semibold mb-2">
            Phone No.:
          </label>
          <input
            type="phone"
            id="phone"
            name="phone"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter your Contact no."
            value={user.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="block font-semibold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-2">
          <label htmlFor="confirmPassword" className="block font-semibold mb-2">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Re-enter your password"
            value={user.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
