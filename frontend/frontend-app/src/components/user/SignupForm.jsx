import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";

export const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
 

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleAdminChange = (e) => {
    setIsAdmin(e.target.checked);
  };

  const submitForm = (e) => {
    e.preventDefault();
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    if (username === "" || password === "" || confirmPassword === "") {
      Toast.fire({
        icon: "error",
        title: "Please complete all fields!",
      });
      return; // stop form submission
    }
    if (password !== confirmPassword) {
      setRepeatPasswordError("Passwords do not match");
      return; // stop form submission
    }

    const user = {
      username: username,
      password: password,
      role: isAdmin,
    };

    axios
      .post("http://localhost:8080/api/v1/user/signup", user)
      .then((res) => {
        if (res.request.status == 200) {
          console.log("res :>> ", res.request.status);
          Toast.fire({
            icon: "success",
            title: "User created successfully",
          });
        }
        
      })
      .catch((error) => {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: error.response.data,
        });
      });
  };

  const validateRepeatPassword = () => {
    if (password !== confirmPassword) {
      setRepeatPasswordError("Passwords do not match");
    } else {
      setRepeatPasswordError("");
    }
  };

  useEffect(() => {
    validateRepeatPassword();
  }, [confirmPassword]);

  return (
    <form id="signup-form" onSubmit={submitForm}>
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
          type="username"
          placeholder="Username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            repeatPasswordError ? "border-red-500" : ""
          }`}
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          onBlur={validateRepeatPassword}
          onSubmit={validateRepeatPassword}
        />
        {repeatPasswordError && (
          <p className="text-red-500 text-xs italic">{repeatPasswordError}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="isAdmin">
          Admin
        </label>
        <input
          className="form-checkbox h-5 w-5 text-gray-600"
          type="checkbox"
          id="isAdmin"
          name="isAdmin"
          checked={isAdmin}
          onChange={handleAdminChange}
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Signup
        </button>
      </div>
    </form>
  );
};
