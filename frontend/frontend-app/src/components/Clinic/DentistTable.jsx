import axios from "axios";
import React from "react";
import { BsPencil } from "react-icons/bs";

export const DentistTable = () => {
  const dentists = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      registrationNumber: "12345",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Doe",
      registrationNumber: "67890",
    },
  ];

  function submitForm(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the form input values
    const patient = document.getElementById("patientForm").value;
    const dentist = document.getElementById("dentistForm").value;
    const date = document.getElementById("dateForm").value;

    // Create the request body
    const requestBody = {
      patient,
      dentist,
      date,
    };

    // Send the request to the API endpoint
    axios
      .post("https://localhost:8000/turnos", requestBody)
      .then((response) => {
        if (response.status === 200) {
          // Show a success message to the user
          alert("Turno guardado correctamente");

          // Reset the form
          document.getElementById("patientForm").value = "";
          document.getElementById("dentistForm").value = "";
          document.getElementById("dateForm").value = "";
        } else {
          // Show an error message to the user
          alert("Error al guardar el turno");
        }
      })
      .catch((error) => {
        // Show an error message to the user
        alert("Error al guardar el turno");
      });
  }

  const showForm = () => {
    let form = document.getElementById("form-dentist-container");
    form.style.display = "flex";
  };

  const hideForm = () => {
    let form = document.getElementById("form-dentist-container");
    form.style.display = "none";

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
            className="hidden fixed inset-0 items-center justify-center backdrop-blur-md bg-opacity-75 "
            style={{ marginTop: "0" }}
          >
            <div className="bg-white p-6 mt-0 rounded-lg shadow-lg">
              <h2 className="text-lg font-medium mb-4">New dentist</h2>
              <form
                className="space-y-4"
                onSubmit={() => {
                  submitForm();
                }}
              >
                <div className="flex flex-col">
                  <label className="mb-1 font-medium" for="firstName">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="rounded-lg border-gray-400 border-solid border py-2 px-3"
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
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium" for="date">
                    Registration Number
                  </label>
                  <input
                    id="registrationNumber"
                    name="registrationNumber"
                    className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                    type="text"
                  />
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
                    Cancel
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
