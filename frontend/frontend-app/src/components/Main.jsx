import React from "react";
import banner from "../assets/img/hero-banner.jpg";
import { Appoitment } from "./Clinic/Appoitment";
export const Main = () => {
  let usuario = "Tadeo";
  return (
    <>
      {/* {" "}
      <div className="relative">
        <img src={banner} className="w-full " alt="" />

        <div className="flex flex-col justify-center items-center absolute left-[40%] top-[25%]">
          <h1 className="text-[3em] font-bold text-blue-600 bg-white rounded-full p-2 pl-4 pr-4 mb-6">
            Bienvenido {usuario}
          </h1>
          <button className="text-lg font-bold rounded-md hover:bg-black transition-all ease-in-out duration-300 bg-indigo-700 border-indigo-700 border text-white p-4 mb-6 w-[350px]">
            Gestión de pacientes y odontólogos
          </button>
          <button className="text-lg font-bold rounded-md hover:bg-black transition-all ease-in-out duration-300 bg-indigo-700 border-indigo-700 border text-white p-4">
            Gestión de turnos
          </button>
        </div>
      </div> */}
      <Appoitment/>
    </>
  );
};
