import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import Swal from "sweetalert2";
import { Dentist } from "@/types/Dentist";

export const DentistTable = () => {
  const [dentist, setDentist] = useState<Partial<Dentist>>({});
  const [dentists, setDentists] = useState<Dentist[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [rnError, setRnError] = useState("");

  function validateDentist(dentist: Partial<Dentist>): boolean {
    if (
      !dentist.lastName ||
      !dentist.firstName ||
      !dentist.registrationNumber
    ) {
      return false;
    }

    if (
      typeof dentist.lastName !== "string" ||
      typeof dentist.firstName !== "string" ||
      typeof dentist.registrationNumber !== "number"
    ) {
      return false;
    }

    return true;
  }

  const updateField = (field: keyof Dentist, value: number | string) => {
    if (field in dentist) {
      setDentist({
        ...dentist,
        [field]: value,
      });
    } else {
      throw new Error(`Invalid field: ${field}`);
    }
  };

  const fetchDentists = () => {
    axios
      .get("http://localhost:9000/api/v1/dentist/findAll")
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
    validateRegistrationNumber();
  }, []);

  const submitUpdateForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    axios
      .get(
        `http://localhost:9000/api/v1/dentist/byRN/${dentist.registrationNumber}`
      )
      .then((res) => {
        updateField("firstName", res.data.firstName);
      });

    if (!/^[0-9]*$/.test(dentist.registrationNumber?.toString() || "")) {
      Toast.fire({
        icon: "error",
        title: "Registration number must be numeric!",
      });
    } else {
      axios
        .put(`http://localhost:9000/api/v1/dentist/${dentist.id}`, dentist)
        .then((res) => {
          if (res.status === 200) {
            console.log("res :>> ", res.data);
            Toast.fire({
              icon: "success",
              title: "Dentist updated successfully",
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
  };

  const validateRegistrationNumber = () => {
    if (
      !dentist.registrationNumber ||
      !/^[0-9]*$/.test(dentist.registrationNumber.toString() || "")
    ) {
      setRnError("Registration number must be numeric");
    } else {
      setRnError("");
    }
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    if (!validateDentist(dentist)) {
      Toast.fire({
        icon: "error",
        title: "Please complete all fields!",
      });
      return;
    } else if (!/^[0-9]*$/.test(dentist.registrationNumber?.toString() || "")) {
      Toast.fire({
        icon: "error",
        title: "Registration number must be numeric!",
      });
    } else {
      axios
        .post("http://localhost:9000/api/v1/dentist/", dentist)
        .then((res) => {
          if (res.status === 200) {
            console.log("res :>> ", res.data);
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
  };

  return (
    <div className="w-full">
      <div className=" flex flex-col justify-center space-y-6">
        <div className=" my-5">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg">Dentists</h1>
            <button
              onClick={() => {
                setShowForm(true);
              }}
              className="inline-block rounded bg-blue-400 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)]"
            >
              NEW DENTIST
            </button>
          </div>
          {showForm && (
            <div
              id="form-dentist-container"
              className="flex fixed inset-0 items-center justify-center  bg-gray-800 bg-opacity-75 "
              style={{ marginTop: "0" }}
            >
              <div className="bg-white p-6 mt-0 rounded-lg shadow-lg">
                <h2 className="text-lg font-medium mb-4">New dentist</h2>
                <form className="space-y-4" onSubmit={submitForm}>
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium">First Name</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                      value={dentist.firstName}
                      onChange={(e) => {
                        updateField("firstName", e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium">Last name</label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                      value={dentist.lastName}
                      onChange={(e) => {
                        updateField("lastName", e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium">
                      Registration Number
                    </label>
                    <input
                      id="registrationNumber"
                      name="registrationNumber"
                      className={`rounded-lg border-gray-400 border-solid border py-2 px-3 ${
                        rnError ? "border-red-500" : ""
                      }`}
                      type="text"
                      onChange={(e) => {
                        updateField("registrationNumber", e.target.value);
                      }}
                      onBlur={validateRegistrationNumber}
                      onSubmit={validateRegistrationNumber}
                    />
                    {rnError && (
                      <p className="text-red-500 text-xs italic">{rnError}</p>
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
                        setShowForm(false);
                      }}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
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
                          className="inline-block rounded bg-orange-500 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-orange-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-orange-500-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-orange-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)]"
                          onClick={() => {
                            setDentist(dentist);
                            setShowUpdateForm(true);
                          }}
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
          {showUpdateForm && (
            <div
              id="form-update-dentist-container"
              className="flex fixed inset-0 items-center justify-center bg-gray-800 bg-opacity-75 mt-0"
            >
              <div className="bg-white p-6 mt-0 rounded-lg shadow-lg">
                <h2 className="text-lg font-medium mb-4">Update dentist</h2>
                <form className="space-y-4" onSubmit={submitUpdateForm}>
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium">First Name</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                      placeholder={dentist.firstName}
                      onChange={(e) => {
                        updateField("firstName", e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium">Last name</label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                      placeholder={dentist.lastName}
                      onChange={(e) => {
                        updateField("lastName", e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium">
                      Registration Number
                    </label>
                    <input
                      className={`rounded-lg border-gray-400 border-solid border py-2 px-3 ${
                        rnError ? "border-red-500" : ""
                      }`}
                      id="registrationNumber"
                      name="registrationNumber"
                      type="text"
                      onBlur={validateRegistrationNumber}
                      onSubmit={validateRegistrationNumber}
                      placeholder={dentist.registrationNumber?.toString() || ""}
                      onChange={(e) => {
                        updateField("registrationNumber", e.target.value);
                      }}
                    />
                    {rnError && (
                      <p className="text-red-500 text-xs italic">{rnError}</p>
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
                        setShowUpdateForm(false);
                      }}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
