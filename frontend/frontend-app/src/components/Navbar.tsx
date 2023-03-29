import React from "react";
import { useState } from "react";
import { FaTooth } from "react-icons/fa";
import { LoginForm } from "./user/LoginForm";
import { SignupForm } from "./user/SignupForm";
import { AiOutlineClose } from "react-icons/ai";
export const Navbar = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isSignupFormVisible, setIsSignupFormVisible] = useState(false);

  return (
    <nav className="w-full z-10 bg-blue-200 shadow-lg">
      <div className="w-full sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-3xl font-bold text-white mr-2">
              Güemes Clinic
            </h1>
            <FaTooth className="text-3xl font-bold text-white" />
          </div>
          <div className="flex items-center">
            <button
              onClick={() => {
                setIsLoginFormVisible(true);
                setIsSignupFormVisible(false);
              }}
              className="bg-white text-blue-500 hover:text-blue-700 rounded-md font-medium py-2 px-4 mr-2"
            >
              Log in
            </button>
            <button
              onClick={() => {
                setIsSignupFormVisible(true);
                setIsLoginFormVisible(false);
              }}
              className="bg-white text-blue-500 hover:text-blue-700 rounded-md font-medium py-2 px-4"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>

      {isLoginFormVisible && (
        <div className="fixed top-0 left-0 h-full w-full bg-gray-800 bg-opacity-75 flex justify-center items-center z-20">
          <div className="bg-white relative rounded-lg p-8 shadow-lg">
            <LoginForm />
            <button
              onClick={() => {
                setIsLoginFormVisible(false);
                setIsSignupFormVisible(false);
              }}
              className="top-0 right-0 mr-6 absolute bg-red-500 text-white hover:bg-red-700 rounded-md font-medium py-2 px-4 mt-4"
            >
              <AiOutlineClose />
            </button>
          </div>
        </div>
      )}

      {isSignupFormVisible && (
        <div className="fixed top-0 left-0 h-full w-full bg-gray-800 bg-opacity-75 flex justify-center items-center z-20">
          <div className="bg-white relative rounded-lg p-8 shadow-lg">
            <SignupForm />
            <button
              onClick={() => {
                setIsLoginFormVisible(false);
                setIsSignupFormVisible(false);
              }}
              className="top-0 right-0 mr-6 absolute bg-red-500 text-white hover:bg-red-700 rounded-md font-medium py-2 px-4 mt-4"
            >
              <AiOutlineClose />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
