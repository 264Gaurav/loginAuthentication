import React from "react";
// import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';

const Home = ({ setLoginUser }) => {
  const clickHandler = () => {
    localStorage.removeItem("accessToken");
    setLoginUser(null);
  };

  return (
    <div className="mx-auto">
      <div className="mx-auto flex items-center justify-between py-4 bg-blue-600 text-blue-100 font-bold text-xl">
        <span className="ml-3">Home Page</span>
        <span
          className="bg-white px-1 mr-3 text-blue-500 rounded-md hover:text-blue-900 hover:px-2 cursor-pointer"
          onClick={clickHandler}
        >
          Logout
        </span>
      </div>
      <p className="mt-4 justify-center mx-4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro repellendus dicta sed alias, sapiente, laudantium voluptas exercitationem aliquam totam tempore, veniam sit quis consectetur.
      </p>
    </div>
  );
};

export default Home;
