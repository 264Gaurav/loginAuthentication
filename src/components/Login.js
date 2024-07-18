import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const LoginForm = ({ setLoginUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = user;

    if (email && password) {
      axios.post(`${SERVER_URL}/auth/login`, user)
        .then((res) => {
          toast.success(res.data.message);
          const { accessToken, refreshToken } = res.data;
          localStorage.setItem('accessToken', accessToken);
          document.cookie = `refreshToken=${refreshToken}`;
          setLoginUser(accessToken);
          navigate("/");
        })
        .catch((err) => {
          toast.error(`Invalid credentials ${err}`);
        });
    }
    else{
      toast.error("Please fill in all the fields");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="w-96 p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
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
        <div className="mb-4">
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
