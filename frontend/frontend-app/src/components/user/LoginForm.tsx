/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { User } from "@/types/User";
import axios from "axios";
import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";

export const LoginForm = () => {
  const [user, setUser] = useState<Partial<User>>({});

  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (field: keyof User, value: number | string | boolean) => {
    if (field in user) {
      setUser({
        ...user,
        [field]: value,
      });
    } else {
      throw new Error(`Invalid field: ${field}`);
    }
  };

  function validateUser(user: Partial<User>): boolean {
    if (!user.username || !user.password) {
      return false;
    }

    return true;
  }

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

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
    } else {
      axios
        .post("http://localhost:9010/api/v1/user/login", {
          username: user.username,
          password: user.password,
        })
        .then((res) => {
          if (res.request.status == 200) {
            Toast.fire({
              icon: "success",
              title: "Signed in successfully",
            });
            sessionStorage.setItem("token", res.data.token);
          }
        })
        .catch((error) => {
          console.log(error);
          Toast.fire({
            icon: "error",
            title: "User not found or invalid data",
          });
        });
    }
  };

  return (
    <div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
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
            value={user.password}
            onChange={(e) => {
              updateField("password", e.target.value);
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};
