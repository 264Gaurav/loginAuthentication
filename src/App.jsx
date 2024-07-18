import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import LoginForm from './components/Login';
import RegisterForm from './components/Register';
import Home from './components/HomePage';

const App = () => {
  const [user, setLoginUser] = useState(localStorage.getItem('accessToken'));

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    // console.log("initially" , accessToken);
    if (accessToken) {
      setLoginUser({ accessToken });
    }
  }, []);

  return (
    <Router>
      {!user && 
        <nav className="bg-blue-500 p-4 text-white text-center">
          <div className="mt-0">
            <Link to="/login" className="mx-2 text-white font-semibold hover:underline">
              Login
            </Link>
            <Link to="/register" className="mx-2 text-white font-semibold hover:underline">
              Register
            </Link>
          </div>
        </nav>
      }
      <Routes>
        <Route path="/login" element={<LoginForm setLoginUser={setLoginUser} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={user ? <Home setLoginUser={setLoginUser} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
