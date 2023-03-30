import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import Swal from "sweetalert2";
import { Patient } from "@/types/Patient";
import { Address } from "@/types/Address";
import { AiOutlineClose } from "react-icons/ai";

const PatientTable = () => {
  const [patient, setPatient] = useState<Patient>({
    id: 0,
    firstName: "",
    lastName: "",
    dni: "",
    address: {
      street: "",
      number: "",
      state: "",
      zipcode: "",
    },
  });

  const [patients, setPatients] = useState<Patient[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [dniError, setDniError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [zipcodeError, setZipcodeError] = useState("");

  function handlePatientChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  }

  function handleAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setPatient((prevPatient) => ({
      ...prevPatient,
      address: {
        ...prevPatient.address,
        [name]: value,
      },
    }));
  }

  function validatePatient(patient: Partial<Patient>): boolean {
    console.log(patient);
    if (
      patient.firstName?.length === 0 ||
      patient.lastName?.length === 0 ||
      patient.dni?.toString()?.length === 0 ||
      patient.address?.street?.length === 0 ||
      patient.address?.number?.length === 0 ||
      patient.address?.zipcode?.length === 0 ||
      patient.address?.state.length === 0
    ) {
      return false;
    }
    return true;
  }

  const updateField = (
    field: keyof Patient | keyof Address,
    value: number | string
  ) => {
    if (field in patient) {
      setPatient({
        ...patient,
        [field]: value,
      });
    } else if (patient.address && field in patient.address) {
      setPatient({
        ...patient,
        address: {
          ...patient.address,
          [field]: value,
        },
      });
    }
  };

  const fetchPatients = () => {
    axios
      .get("http://localhost:9010/api/v1/patient/findAll")
      .then((response) => {
        const json = JSON.stringify(response);
        const data = JSON.parse(json);
        setPatients(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function submitUpdateForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    axios
      .get(`http://localhost:9010/api/v1/patient/byDNI/${patient.dni}`)
      .then((res) => {
        updateField("firstName", res.data.firstName);
      });

    if (
      !/^[0-9]*$/.test(patient.dni?.toString() || "") ||
      !/^[0-9]*$/.test(patient.address?.zipcode.toString() || "") ||
      !/^[0-9]*$/.test(patient.address?.number.toString() || "")
    ) {
      Toast.fire({
        icon: "error",
        title: "DNI, zip code and number must be numeric!",
      });
    } else if (patient.dni?.toString().length >= 10) {
      Toast.fire({
        icon: "error",
        title: "DNI is out of range!",
      });
    } else {
      console.log("patient to update " + JSON.stringify(patient));
      axios
        .put(`http://localhost:9010/api/v1/patient/${patient.id}`, patient)
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

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    if (!validatePatient(patient)) {
      Toast.fire({
        icon: "error",
        title: "Please complete all fields!",
      });
      return;
    } else if (
      !/^[0-9]*$/.test(patient.dni?.toString() || "") ||
      !/^[0-9]*$/.test(patient.address?.zipcode.toString() || "") ||
      !/^[0-9]*$/.test(patient.address?.number.toString() || "")
    ) {
      Toast.fire({
        icon: "error",
        title: "DNI, zip code and number must be numeric!",
      });
    } else if (patient.dni?.toString().length >= 10) {
      Toast.fire({
        icon: "error",
        title: "DNI is out of range!",
      });
    } else {
      console.log("patient to submit ", patient);
      axios
        .post("http://localhost:9010/api/v1/patient/", patient)
        .then((res) => {
          if (res.status === 200) {
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

  const validateDni = () => {
    if (!/^[0-9]*$/.test(patient.dni?.toString() || "")) {
      setDniError("DNI must be numeric");
    } else {
      setDniError("");
    }
  };

  const validateNumber = () => {
    if (!/^[0-9]*$/.test(patient.address?.number.toString() || "")) {
      setNumberError("Street number must be numeric");
    } else {
      setNumberError("");
    }
  };

  const validateZipcode = () => {
    if (!/^[0-9]*$/.test(patient.address?.zipcode.toString() || "")) {
      console.log("ZIPCODE");
      setZipcodeError("Zip code must be numeric");
    } else {
      setZipcodeError("");
    }
  };

  const handlePatientDelete = (id: number) => {
    console.log("patient :>> ", patient);
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete the patient with ID ${id}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        submitDelete(id);
      } else {
        return;
      }
    });
  };
  const submitDelete = (id: number) => {
    console.log("entra :>> ");
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    axios
      .delete(`http://localhost:9010/api/v1/patient/${id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log("res :>> ", res.data);
          Toast.fire({
            icon: "success",
            title: "Patient deleted successfully",
          });
          window.location.href = "/";
        }
      })
      .catch((error) => {
        Toast.fire({
          icon: "error",
          title: error.response.data,
        });
      });
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className=" flex  flex-col justify-center space-y-6">
    <div className="flex  justify-between items-center">
          <h1 className="text-lg">Patients</h1>
          <button
            onClick={() => {
              setShowForm(true);
            }}
            className="inline-block rounded bg-blue-400 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)]"
          >
            NEW PATIENT
          </button>
        </div>
        {showForm && (
          <div
            id="form-patient-container"
            className="flex fixed inset-0 items-center justify-center bg-gray-800 bg-opacity-75 "
            style={{ marginTop: "0" }}
          >
            <div className="bg-white p-6 mt-0 rounded-lg shadow-lg">
              <h2 className="text-lg font-medium mb-4">New patient</h2>
              <form className="space-y-4" onSubmit={submitForm}>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">First Name</label>
                  <input
                    type="text"
                    className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                    value={patient.firstName}
                    onChange={(event) =>
                      setPatient({ ...patient, firstName: event.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Last name</label>
                  <input
                    type="text"
                    className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                    value={patient.lastName}
                    onChange={(event) =>
                      setPatient({ ...patient, lastName: event.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">DNI</label>
                  <input
                    className={`rounded-lg border-gray-400 border-solid border py-2 px-3 ${
                      dniError ? "border-red-500" : ""
                    }`}
                    id="dni"
                    name="dni"
                    type="text"
                    value={patient.dni}
                    onChange={(event) =>
                      setPatient({
                        ...patient,
                        dni: event.target.value,
                      })
                    }
                    onBlur={validateDni}
                    onSubmit={validateDni}
                  />
                  {dniError && (
                    <p className="text-red-500 text-xs italic">{dniError}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Address</label>
                  <div className="flex flex-wrap space-x-3">
                    <div className="flex flex-col">
                      <label className="mb-1 font-medium">Street</label>
                      <input
                        id="street"
                        name="street"
                        type="text"
                        className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                        value={patient.address.street}
                        onChange={(event) => {
                          setPatient((prevPatient) => ({
                            ...prevPatient,
                            address: {
                              ...prevPatient.address,
                              street: event.target.value,
                            },
                          }));
                        }}
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
                        value={patient.address.number}
                        onChange={(event) => {
                          setPatient((prevPatient) => ({
                            ...prevPatient,
                            address: {
                              ...prevPatient.address,
                              number: event.target.value,
                            },
                          }));
                        }}
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
                        value={patient.address.zipcode}
                        onChange={(event) => {
                          setPatient((prevPatient) => ({
                            ...prevPatient,
                            address: {
                              ...prevPatient.address,
                              zipcode: event.target.value,
                            },
                          }));
                        }}
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
                        value={patient.address.state}
                        onChange={(event) => {
                          setPatient((prevPatient) => ({
                            ...prevPatient,
                            address: {
                              ...prevPatient.address,
                              state: event.target.value,
                            },
                          }));
                        }}
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
              <th className="py-3 px-4 text-left">DNI</th>
              <th className="py-3 px-4 text-center w-[20px] ">Address</th>
              <th className="py-3 px-4">Settings</th>
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
                  <td className="py-3 px-12 text-left w-[20px] text-[11px]">
                    {patient.address.street},{patient.address.number},
                    {patient.address.zipcode},{patient.address.state}
                  </td>
                  <td className="flex-col justify-start">
                    <td className="flex justify-center items-center align-middle my-2">
                      <button
                        type="button"
                        className="inline-block rounded bg-orange-500 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-orange-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-orange-500-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-orange-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)]"
                        onClick={() => {
                          setPatient(patient);
                          setShowUpdateForm(true);
                        }}
                      >
                        <BsPencil />
                      </button>
                    </td>
                    <td className="flex justify-center items-center align-middle my-2">
                      <button
                        type="button"
                        className="inline-block rounded bg-red-500 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-red-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-red-500-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)]"
                        onClick={() =>
                          patient.id !== undefined &&
                          handlePatientDelete(patient.id)
                        }
                      >
                        <AiOutlineClose />
                      </button>
                    </td>
                  </td>

                  <td className="flex justify-center items-center align-middle"></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {showUpdateForm && (
          <div
            id="form-update-patient-container"
            className="flex fixed inset-0 items-center justify-center bg-gray-800 bg-opacity-75 mt-0"
          >
            <div className="bg-white p-6 mt-0 rounded-lg shadow-lg">
              <h2 className="text-lg font-medium mb-4">Update patient</h2>
              <form className="space-y-4" onSubmit={submitUpdateForm}>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                    placeholder={patient.firstName}
                    onChange={handlePatientChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Last name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                    placeholder={patient.lastName}
                    onChange={handlePatientChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">DNI</label>
                  <input
                    className={`rounded-lg border-gray-400 border-solid border py-2 px-3 ${
                      dniError ? "border-red-500" : ""
                    }`}
                    id="dni"
                    name="dni"
                    type="text"
                    onBlur={validateDni}
                    onSubmit={validateDni}
                    placeholder={patient.dni?.toString()}
                    onChange={handlePatientChange}
                  />
                  {dniError && (
                    <p className="text-red-500 text-xs italic">{dniError}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Address</label>
                  <div className="flex flex-wrap space-x-3">
                    <div className="flex flex-col">
                      <label className="mb-1 font-medium">Street</label>
                      <input
                        id="street"
                        name="street"
                        type="text"
                        className="rounded-lg border-gray-400 border-solid border py-2 px-3"
                        placeholder={patient.address?.street}
                        onChange={handleAddressChange}
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
                        placeholder={patient.address?.number.toString()}
                        onBlur={validateNumber}
                        onSubmit={validateNumber}
                        onChange={handleAddressChange}
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
                        placeholder={patient.address?.zipcode.toString() || ""}
                        onBlur={validateZipcode}
                        onSubmit={validateZipcode}
                        onChange={handleAddressChange}
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
                        placeholder={patient.address?.state.toString() || ""}
                        onChange={handleAddressChange}
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
  );
};

export default PatientTable;
