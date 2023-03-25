import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import Swal from "sweetalert2";

const PatientTable = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dni, setDni] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [state, setState] = useState("");

  const [patients, setPatients] = useState([]);

  const [dniError, setDniError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [zipcodeError, setZipcodeError] = useState("");

  const patient = {
    lastName,
    firstName,
    dni,
    address: {
      street,
      number,
      zipcode,
      state,
    },
  };

  console.log("patient :>> ", patient);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleDNI = (e) => {
    setDni(e.target.value);
  };
  const handleStreet = (e) => {
    setStreet(e.target.value);
  };
  const handleNumber = (e) => {
    setNumber(e.target.value);
  };
  const handleZipCode = (e) => {
    setZipCode(e.target.value);
  };
  const handleState = (e) => {
    setState(e.target.value);
  };

  const fetchPatients = () => {
    axios
      .get("http://localhost:9000/api/v1/patient/findAll")
      .then((response) => {
        let json = JSON.stringify(response);
        let data = JSON.parse(json);
        setPatients(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchPatients();
    validateDni();
    validateNumber();
    validateZipcode();
  }, []);

  function submitUpdateForm(e) {
    e.preventDefault();

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

  

    axios.get("http://localhost:9000/api/v1/patient/byDNI", dni)
    .then((res) => {
      setFirstName(res.firstName)
    })



    if (
      !/^[0-9]*$/.test(dni) ||
      !/^[0-9]*$/.test(zipcode) ||
      !/^[0-9]*$/.test(number)
    ) {
      Toast.fire({
        icon: "error",
        title: "DNI, zip code and number must be numeric!",
      });
    } else {
      console.log(patient);
      let id
      axios
        .put(`http://localhost:9000/api/v1/patient/${id}`, patient)
        .then((res) => {
          if (res.status === 200) {
            console.log("res :>> ", res.data);
            Toast.fire({
              icon: "success",
              title: "Patient updated successfully",
            });
          }
        })
        .catch((error) => {
          console.log("error :>> ", error);
          Toast.fire({
            icon: "error",
            title: error.response.data,
          });
        });
    }
  }

  function submitForm(e) {
    e.preventDefault();

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    if (
      lastName === "" ||
      firstName === "" ||
      dni === "" ||
      street === "" ||
      number === "" ||
      zipcode === "" ||
      state === ""
    ) {
      Toast.fire({
        icon: "error",
        title: "Please complete all fields!",
      });
      return;
    } else if (
      !/^[0-9]*$/.test(dni) ||
      !/^[0-9]*$/.test(zipcode) ||
      !/^[0-9]*$/.test(number)
    ) {
      Toast.fire({
        icon: "error",
        title: "DNI, zip code and number must be numeric!",
      });
    } else {
      console.log(patient);
      axios
        .post("http://localhost:9000/api/v1/patient/", patient)
        .then((res) => {
          if (res.status === 200) {
            console.log("res :>> ", res.data);
            Toast.fire({
              icon: "success",
              title: "Patient created successfully",
            });
          }
        })
        .catch((error) => {
          console.log("error :>> ", error);
          Toast.fire({
            icon: "error",
            title: error.response.data,
          });
        });
    }
  }

  const showForm = () => {
    let form = document.getElementById("form-patient-container");
    form.style.display = "flex";
  };

  const hideForm = () => {
    let form = document.getElementById("form-patient-container");
    form.style.display = "none";
  };

  const showUpdateForm = () => {
    let form = document.getElementById("form-update-patient-container");
    form.style.display = "flex";
  };

  const hideUpdateForm = () => {
    let form = document.getElementById("form-update-patient-container");
    form.style.display = "none";
  };

  const validateDni = () => {
    if (!/^[0-9]*$/.test(dni)) {
      setDniError("DNI must be numeric");
    } else {
      setDniError("");
    }
  };

  const validateNumber = () => {
    if (!/^[0-9]*$/.test(number)) {
      setNumberError("Street number must be numeric");
    } else {
      setNumberError("");
    }
  };

  const validateZipcode = () => {
    if (!/^[0-9]*$/.test(number)) {
      setZipcodeError("Zip code must be numeric");
    } else {
      setZipcodeError("");
    }
  };

  return (
    <div className="w-full">
      <div className=" my-2">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg">Patients</h1>
          <button
            onClick={() => {
              showForm();
            }}
            className="inline-block rounded bg-blue-400 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)]"
          >
            NEW PATIENT
          </button>
        </div>

        {}
        <div
          id="form-patient-container"
          className="hidden fixed inset-0 items-center justify-center bg-gray-800 bg-opacity-75 "
          style={{ marginTop: "0" }}
        >
          <div className="bg-white p-6 mt-0 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium mb-4">New patient</h2>
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
                  value={firstName}
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
                  DNI
                </label>
                <input
                  className={`rounded-lg border-gray-400 border-solid border py-2 px-3 ${
                    dniError ? "border-red-500" : ""
                  }`}
                  id="registrationNumber"
                  name="registrationNumber"
                  type="text"
                  onChange={handleDNI}
                  onBlur={validateDni}
                  onSubmit={validateDni}
                />
                {dniError && (
                  <p className="text-red-500 text-xs italic">{dniError}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium" htmlFor="street">
                  Address
                </label>
                <div className="flex flex-wrap space-x-3">
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium" htmlFor="street">
                      Street
                    </label>
                    <input
                      id="street"
                      name="street"
                      type="text"
                      className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                      onChange={handleStreet}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium" htmlFor="number">
                      Number
                    </label>
                    <input
                      id="number"
                      name="number"
                      type="text"
                      className={`rounded-lg border-gray-400 border-solid border py-2 px-3 ${
                        numberError ? "border-red-500" : ""
                      }`}
                      onChange={handleNumber}
                      onBlur={validateNumber}
                      onSubmit={validateNumber}
                    />
                    {numberError && (
                      <p className="text-red-500 text-xs italic">
                        {numberError}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium" htmlFor="zipCode">
                      Zip Code
                    </label>
                    <input
                      id="zipCode"
                      name="zipCode"
                      type="text"
                      className={`rounded-lg border-gray-400 border-solid border py-2 px-3 ${
                        zipcodeError ? "border-red-500" : ""
                      }`}
                      onChange={handleZipCode}
                      onBlur={validateZipcode}
                      onSubmit={validateZipcode}
                    />
                    {zipcodeError && (
                      <p className="text-red-500 text-xs italic">
                        {zipcodeError}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium" htmlFor="state">
                      State
                    </label>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                      onChange={handleState}
                    />
                  </div>
                </div>
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
              <th className="py-3 px-4 text-left">DNI</th>
              <th className="py-3 px-4 text-left">Address</th>
              <th className="py-3 px-4">Edit</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {patients.map((patient) => {
              return (
                <tr className="border-b border-gray-200 hover:bg-gray-100 px-12">
                  <td className="py-3 px-5 text-left">{patient.id}</td>
                  <td className="py-3 px-4 text-left">{patient.lastName}</td>
                  <td className="py-3 px-4 text-left">{patient.firstName}</td>
                  <td className="py-3 px-4 text-left">{patient.dni}</td>
                  <td className="py-3 px-12 w-full text-left text-[11px]">
                    {patient.address.street}, {patient.address.number},{" "}
                    {patient.address.city} {patient.address.zipcode},
                    {patient.address.state}
                  </td>
                  <td className="flex justify-center items-center align-middle">
                    <td className="flex justify-center items-center align-middle mt-1 mr-4">
                      <button
                        type="button"
                        class="inline-block rounded bg-orange-500 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-orange-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-orange-500-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-orange-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)]"
                        onClick={() => {
                          showUpdateForm();
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
            id="form-update-patient-container"
            className="hidden fixed inset-0 items-center justify-center bg-gray-800 bg-opacity-75 "
            style={{ marginTop: "0" }}
          >
            <div className="bg-white p-6 mt-0 rounded-lg shadow-lg">
              <h2 className="text-lg font-medium mb-4">Update patient</h2>
              <form className="space-y-4" onSubmit={submitUpdateForm}>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium" for="firstName">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                    placeholder={firstName}
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
                    placeholder={lastName}
                    onChange={handleLastName}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium" for="date">
                    DNI
                  </label>
                  <input
                    className={`rounded-lg border-gray-400 border-solid border py-2 px-3 ${
                      dniError ? "border-red-500" : ""
                    }`}
                    id="registrationNumber"
                    name="registrationNumber"
                    type="text"
                    onChange={handleDNI}
                    onBlur={validateDni}
                    onSubmit={validateDni}
                    placeholder={dni}
                  />
                  {dniError && (
                    <p className="text-red-500 text-xs italic">{dniError}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium" htmlFor="street">
                    Address
                  </label>
                  <div className="flex flex-wrap space-x-3">
                    <div className="flex flex-col">
                      <label className="mb-1 font-medium" htmlFor="street">
                        Street
                      </label>
                      <input
                        id="street"
                        name="street"
                        type="text"
                        className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                        placeholder={street}
                        onChange={handleStreet}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-1 font-medium" htmlFor="number">
                        Number
                      </label>
                      <input
                        id="number"
                        name="number"
                        type="text"
                        className={`rounded-lg border-gray-400 border-solid border py-2 px-3 ${
                          numberError ? "border-red-500" : ""
                        }`}
                        placeholder={number}
                        onChange={handleNumber}
                        onBlur={validateNumber}
                        onSubmit={validateNumber}
                      />
                      {numberError && (
                        <p className="text-red-500 text-xs italic">
                          {numberError}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-1 font-medium" htmlFor="zipCode">
                        Zip Code
                      </label>
                      <input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        className={`rounded-lg border-gray-400 border-solid border py-2 px-3 ${
                          zipcodeError ? "border-red-500" : ""
                        }`}
                        placeholder={patient.zipcode}
                        onChange={handleZipCode}
                        onBlur={validateZipcode}
                        onSubmit={validateZipcode}
                      />
                      {zipcodeError && (
                        <p className="text-red-500 text-xs italic">
                          {zipcodeError}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-1 font-medium" htmlFor="state">
                        State
                      </label>
                      <input
                        id="state"
                        name="state"
                        type="text"
                        className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                        placeholder={state}
                        onChange={handleState}
                      />
                    </div>
                  </div>
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
                      hideUpdateForm();
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
  );
};

export default PatientTable;
