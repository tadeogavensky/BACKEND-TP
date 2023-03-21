import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import Swal from "sweetalert2";


export const DentistTable = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");


  const [dentists, setDentists] = useState([]);
  
  const [rnError, setRnError] = useState("");


  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleRegistrationNumber = (e) => {
    setRegistrationNumber(e.target.value);
  };
  
  const fetchDentists = () => {
    axios
      .get("http://localhost:8090/api/v1/dentist/findAll")
      .then((response) => {
        let json = JSON.stringify(response);
        let data = JSON.parse(json);
        setDentists(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchDentists();
  }, []);

  function submitForm(e) {
    e.preventDefault();

    const dentist = {
      lastName,
      firstName,
      registrationNumber,
    };

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

    if (
      lastName === "" ||
      firstName === "" ||
      registrationNumber === ""
    ) {
      Toast.fire({
        icon: "error",
        title: "Please complete all fields!",
      });
      return;
    } else if( !/^[0-9]*$/.test(registrationNumber)) {
      Toast.fire({
        icon: "error",
        title: "Registration number must be numeric!",
      });
    }else{
      console.log(dentist);
      axios
        .post("http://localhost:8090/api/v1/dentist/", dentist)
        .then((res) => {
          if (res.status === 200) {
            Toast.fire({
              icon: "success",
              title: "Dentist created successfully",
            });
          }
        })
        .catch((error) => {
          Toast.fire({
            icon: "error",
            title: error.response.data,
          });
        });
    }
  }

  const showForm = () => {
    let form = document.getElementById("form-dentist-container");
    form.style.display = "flex";
  };

  const hideForm = () => {
    let form = document.getElementById("form-dentist-container");
    form.style.display = "none";
  };

  const validateRN = () => {
    if (!/^[0-9]*$/.test(registrationNumber)) {
      setRnError("Registration number must be numeric");
    } else {
      setRnError("");
    }
  };

  return (
    <div className="w-full">
      <div className=" flex flex-col justify-center space-y-6">
        <div className=" my-5">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg">Dentists</h1>
            <button
              onClick={() => {
                showForm();
              }}
              className="inline-block rounded bg-blue-400 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)]"
            >
              NEW DENTIST
            </button>
          </div>

          <div
            id="form-dentist-container"
            className="hidden fixed inset-0 items-center justify-center  bg-gray-800 bg-opacity-75 "
            style={{ marginTop: "0" }}
          >
            <div className="bg-white p-6 mt-0 rounded-lg shadow-lg">
              <h2 className="text-lg font-medium mb-4">New dentist</h2>
              <form className="space-y-4" onSubmit={submitForm}>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium" for="firstName">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                    onChange={handleFirstName}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium" for="lastName">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                    onChange={handleLastName}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium" for="date">
                    Registration Number
                  </label>
                  <input
                    id="registrationNumber"
                    name="registrationNumber"
                    className={`rounded-lg border-gray-400 border-solid border py-2 px-3 ${
                      rnError ? "border-red-500" : ""
                    }`}
                    type="text"
                    onChange={handleRegistrationNumber}
                      onBlur={validateRN}
                      onSubmit={validateRN}
                  />
                     {rnError && (
                      <p className="text-red-500 text-xs italic">
                        {rnError}
                      </p>
                    )}
                </div>
                <div className="flex justify-start">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-4 w-full"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg py-2 px-4"
                    onClick={() => {
                      hideForm();
                    }}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>

          <table className="w-full table-auto shadow-md rounded">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Last name</th>
                <th className="py-3 px-4 text-left">First name</th>
                <th className="py-3 px-4 text-left">Registration Number</th>
                <th className="py-3 px-4">Edit</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {dentists.map((dentist) => {
                return (
                  <tr className="border-b border-gray-200 hover:bg-gray-100 px-12">
                    <td className="py-3 px-5 text-left">{dentist.id}</td>
                    <td className="py-3 px-4 text-left">{dentist.lastName}</td>
                    <td className="py-3 px-4 text-left">{dentist.firstName}</td>
                    <td className="py-3 px-4 text-left">
                      {dentist.registrationNumber}
                    </td>
                    <td className="flex justify-center items-center align-middle">
                      <td className="flex justify-center items-center align-middle mt-1">
                        <button
                          type="button"
                          class="inline-block rounded bg-orange-500 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-orange-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-orange-500-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-orange-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)]"
                        >
                          <BsPencil />
                        </button>
                      </td>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
