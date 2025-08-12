"use client";

import { useState } from "react";
import RaceDataForm from "./RaceDataForm";
import RaceDetailForm from "./RaceDetailForm";

export default function Page() {
  const [activeForm, setActiveForm] = useState("data");

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex gap-4 mb-6">
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
      </div>

      {/* Form Area */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        {activeForm === "data" ? <RaceDataForm /> : <RaceDetailForm />}
      </div>
    </div>
  );
}
