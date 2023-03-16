import { useState, React, useEffect } from "react";

import { FaTooth } from "react-icons/fa";

export const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
    document.getElementById("login-button").classList.add("rounded-b-none")
    document.getElementById("login-form").classList.add("rounded-t-none")

  };

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false);
    document.getElementById("signup-button").classList.add("rounded-b-none")
    document.getElementById("signup-form").classList.add("rounded-t-none")
  };

  useEffect(() => {
    setShowLogin(false);
    setShowSignup(false);
  }, []); 

  return (
    <div className="p-4 flex flex-col md:flex-row flex-wrap  justify-between items-center bg-slate-600">
      <div className="flex items-center mb-6 md:mb-0">
        <h1 className="text-white text-lg font-bold mr-2">Centro Güemes</h1>
        <FaTooth className="text-white text-lg" />
      </div>

      <div className="flex justify-between space-x-10">
        <div className="flex flex-col w-[300px]  relative">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-b-sm rounded-t-sm rounded-l-sm rounded-r-sm focus:outline-none focus:shadow-outline"
            onClick={handleLoginClick}
            id="login-button"
          >
            Login
          </button>
          {showLogin && (
            <form id="login-form" className="absolute top-full left-0 right-0 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 z-10">
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleLoginClick}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="flex flex-col w-[300px]  relative">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-b-sm rounded-t-sm rounded-l-sm rounded-r-sm focus:outline-none focus:shadow-outline"
            onClick={handleSignupClick}
            id="signup-button"
          >
            Registrarse
          </button>
          {showSignup && (
            <form id="signup-form" className="absolute top-full left-0 right-0 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 z-10">
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleSignupClick}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Signup
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
