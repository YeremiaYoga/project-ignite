"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Step1 from "./Step1.jsx";
import Step2 from "./Step2.jsx";
import Step3 from "./Step3.jsx";
import Step4 from "./Step4.jsx";
import Step5 from "./Step5.jsx";

export default function CreateCharacterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialStep = parseInt(searchParams.get("step") || "0", 10);
  const [currentStep, setCurrentStep] = useState(initialStep);

  const [formData, setFormData] = useState({
    step1: {
      name: "",
      fullname: "",
      art: "",
      token_art: "",
      creator_name: "",
      creator_email: "",
      randomid: "",
      race: "",
      sub_race: "",
      background: "",
      character_type: "",
      allignment: "",
      status: "",
      birth_year: "",
      birth_year_type: "",
      death_year: "",
      death_year_type: "",
      birth_place: "",
      gender: "",
      pronoun: "",
      height: { feet: "", inch: "", centimeter: "" },
      weight: { pounds: "", kilogram: "" },
      skin_colour: "",
      hair: "",
      wiki_visibility: true,
    },
    step2: {
      backstory: "",
      wayfarer: "",
      titles: [],
      detailed_personality: [],
      personality_traits: "",
      voice_style: "",
      main_personality: "",
      previous_economical_standing: "",
      current_last_economical_standing: "",
      social_classes: "",
    },
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

  const goToStep = (step) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
      router.push(`/characters-maker/create?step=${step}`, { scroll: false });
    }
  };

  const nextStep = () => goToStep(currentStep + 1);
  const prevStep = () => goToStep(currentStep - 1);

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/characters/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData.step1,
        }),
      });

      const result = await res.json();
      if (result.success) {
        alert("Character saved ");
      } else {
        alert("Error saving character: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save character.");
    }
  };

  const CurrentComponent = steps[currentStep].component;

  return (
    <main className="max-w-6xl w-full mx-auto px-4 py-8 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Character</h1>

      <div className="flex justify-center mb-6 gap-2">
        {steps.map((s, idx) => (
          <div
            key={s.key}
            onClick={() => goToStep(idx)}
            className={`cursor-pointer w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
              idx === currentStep
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            {idx + 1}
          </div>
        ))}
      </div>

      <div className="p-6 rounded-lg shadow mb-6">
        <CurrentComponent
          data={formData[steps[currentStep].key]}
          allData={formData}
          onChange={(field, value) =>
            handleChange(steps[currentStep].key, field, value)
          }
        />
      </div>

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

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded shadow"
          >
            Save
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
      </div>
    </main>
  );
}
