import { User } from "@/types/User";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";

export const SignupForm = () => {
  const [user, setUser] = useState<Partial<User>>({});

  const [confirmPassword, setConfirmPassword] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");

  const updateField = (field: keyof User, value: number | string | boolean) => {
    if (field in user) {
      console.log('entra a aca updateField de user ');
      setUser({
        ...user,
        [field]: value,
      });
    } else {
      throw new Error(`Invalid field: ${field}`);
    }
  };

  function validateUser(user: Partial<User>): boolean {
    if (!user.username || !user.password || !validateRepeatPassword()) {
      return false;
    }

    return true;
  }

  const submitForm = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    if (!validateUser(user)) {
      Toast.fire({
        icon: "error",
        title: "Please complete all fields!",
      });
      return;
    }

    axios
      .post("http://localhost:9010/api/v1/user/signup", {
        username: user.username,
        password: user.password,
        role: user.role,
      })
      .then((res) => {
        if (res.request.status == 200) {
          console.log("res from userSingup :>> ", res);
          Toast.fire({
            icon: "success",
            title: "User created successfully",
          });
        }

        sessionStorage.setItem("token", res.data.token);
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
    console.log("user.password " +user.password);
    console.log('confirmPassword ' + confirmPassword);
    if (user.password !== confirmPassword) {
      setRepeatPasswordError("Passwords do not match");
      return false;
    } else {
      setRepeatPasswordError("");
      return true;
    }
  };

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
          value={user.username}
          onChange={(e) => {
            updateField("username", e.target.value);
          }}
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
          onChange={(e) => {
            updateField("password", e.target.value);
          }}
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
          onChange={(e) => {
            setConfirmPassword(e.target.value)
            validateRepeatPassword();
          }}
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
          checked={user.role}
          onChange={(e) => {
            updateField("role", e.target.value);
          }}
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
