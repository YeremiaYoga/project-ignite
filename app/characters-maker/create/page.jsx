"use client";

import { useState } from "react";
import Step1 from "./Step1.jsx";
import Step2 from "./Step2.jsx";
import Step3 from "./Step3.jsx";
import Step4 from "./Step4.jsx";
import Step5 from "./Step5.jsx";

export default function CreateCharacterPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    step1: { name: "", race: "" },
    step2: { hair: "", eyes: "" },
    step3: { origin: "", story: "" },
    step4: { strength: "", magic: "" },
    step5: { notes: "" },
  });

  const steps = [
    { title: "Step 1", component: Step1, key: "step1" },
    { title: "Step 2", component: Step2, key: "step2" },
    { title: "Step 3", component: Step3, key: "step3" },
    { title: "Step 4", component: Step4, key: "step4" },
    { title: "Step 5", component: Step5, key: "step5" },
  ];

  const handleChange = (stepKey, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [stepKey]: { ...prev[stepKey], [field]: value },
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log("Final JSON:", formData);
    alert("Character saved! Check console.");
  };

  const CurrentComponent = steps[currentStep].component;

  return (
    <main className="max-w-6xl w-full mx-auto px-4 py-8 text-white  min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Character</h1>

      {/* Step indicator */}
      <div className="flex justify-center mb-6 gap-2">
        {steps.map((s, idx) => (
          <div
            key={s.key}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
              idx === currentStep
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            {idx + 1}
          </div>
        ))}
      </div>

      {/* Render Step */}
      <div className=" p-6 rounded-lg shadow mb-6">
        <CurrentComponent
          data={formData[steps[currentStep].key]}
          onChange={(field, value) =>
            handleChange(steps[currentStep].key, field, value)
          }
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`px-4 py-2 rounded shadow ${
            currentStep === 0
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Previous
        </button>

        {currentStep === steps.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded shadow"
          >
            Finish
          </button>
        ) : (
          <button
            onClick={nextStep}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded shadow"
          >
            Next
          </button>
        )}
      </div>
    </main>
  );
}
