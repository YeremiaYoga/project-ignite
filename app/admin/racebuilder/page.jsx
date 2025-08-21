"use client";

import { useState } from "react";
import RaceDataForm from "./RaceDataForm";
import RaceDetailForm from "./RaceDetailForm";
import SubraceDataForm from "./SubraceDataForm";

export default function Page() {
  const [activeForm, setActiveForm] = useState("data"); // Initial active form

  return (
    <div className="p-6 mx-auto w-full max-w-5xl">
      <div className="flex gap-4 mb-6 justify-center">
        <button
          className={`px-6 py-3 text-lg font-semibold rounded-lg transition ${
            activeForm === "data"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-800 hover:bg-gray-400"
          }`}
          onClick={() => setActiveForm("data")}
        >
          Race Data Form
        </button>

        <button
          className={`px-6 py-3 text-lg font-semibold rounded-lg transition ${
            activeForm === "detail"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-800 hover:bg-gray-400"
          }`}
          onClick={() => setActiveForm("detail")}
        >
          Race Detail Form
        </button>

        <button
          className={`px-6 py-3 text-lg font-semibold rounded-lg transition ${
            activeForm === "subrace"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-800 hover:bg-gray-400"
          }`}
          onClick={() => setActiveForm("subrace")}
        >
          Subrace Data Form
        </button>
      </div>

      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full">
        {activeForm === "data" ? (
          <RaceDataForm className="w-full" />
        ) : activeForm === "detail" ? (
          <RaceDetailForm className="w-full" />
        ) : (
          <SubraceDataForm className="w-full" />
        )}
      </div>
    </div>
  );
}
