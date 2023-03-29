import axios from "axios";
import React, { useEffect, useState } from "react";
import { Appoitment } from "./Clinic/Appoitment";
import { DentistTable } from "./Clinic/DentistTable";
import PatientTable from "./Clinic/PatientTable";
import { User } from "@/types/User";
export const Main = () => {
  const [optAppointment, setOptAppointment] = useState(false);
  const [optDP, setOptDP] = useState(false);

  const [user, setUser] = useState<Partial<User>>({});

  const handleOptAppointment = () => {
    setOptAppointment(true);
    setOptDP(false);
  };

  const handleDPAppointment = () => {
    setOptAppointment(false);
    setOptDP(true);
  };

  const getLoggedUser = () => {
    let token = sessionStorage.getItem("token");
    console.log("token :>> ", token);
    axios
      .post("http://localhost:8090/api/v1/user/details", { token })
      .then((res) => {
        console.log("res from userDetails :>> ", res);
        setUser(res.data);
        return user;
      });
  };

  useEffect(() => {
    getLoggedUser();
  }, []);

  return (
    <div className="flex flex-col mt-8 w-full">
      <div className="flex flex-col h-full flex-wrap justify-center items-center mt-8">
        <h1 className="text-4xl font-bold text-blue-600 p-2 pl-4 pr-4 mb-6">
          Welcome {user.username}
        </h1>
        <button
          className="text-lg font-bold rounded-md hover:bg-black transition-all ease-in-out duration-300 bg-indigo-700 border-indigo-700 border text-white p-4 mb-6 w-1/2"
          onClick={handleDPAppointment}
        >
          Manage patients & dentists
        </button>
        <button
          className="text-lg font-bold rounded-md hover:bg-black transition-all ease-in-out duration-300 bg-indigo-700 border-indigo-700 border text-white p-4 w-1/2"
          onClick={handleOptAppointment}
        >
          Manage appointments
        </button>
      </div>
      <div className="p-12">
        {optAppointment && <Appoitment />}

        {optDP && <PatientTable />}
        {optDP && <DentistTable />}
      </div>
    </div>
  );
};
