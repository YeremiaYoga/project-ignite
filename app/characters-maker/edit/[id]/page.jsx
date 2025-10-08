"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import Step1 from "./Step1.jsx";
import Step2 from "./Step2.jsx";
import Step3 from "./Step3.jsx";
import Step4 from "./Step4.jsx";
import Step5 from "./Step5.jsx";

export default function EditCharacterPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const characterId = params?.id;
  const initialStep = parseInt(searchParams.get("step") || "0", 10);

  const [currentStep, setCurrentStep] = useState(initialStep);
  const [loading, setLoading] = useState(true);
  const [talesMode, setTalesMode] = useState(false);
  const [formData, setFormData] = useState(null);

  const steps = [
    { title: "Step 1", component: Step1, key: "step1" },
    { title: "Step 2", component: Step2, key: "step2" },
    { title: "Step 3", component: Step3, key: "step3" },
    { title: "Step 4", component: Step4, key: "step4" },
    { title: "Step 5", component: Step5, key: "step5" },
  ];

  useEffect(() => {
    const mode = Cookies.get("ignite-tales-mode");
    setTalesMode(mode === "true");
  }, []);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const res = await fetch(`/api/characters/getOne?id=${characterId}`);
        const data = await res.json();
        if (data) setFormData(data);
      } catch (err) {
        console.error("Failed to fetch character:", err);
      } finally {
        setLoading(false);
      }
    };
    if (characterId) fetchCharacter();
  }, [characterId]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const goToStep = (step) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
      router.push(`/characters-maker/edit/${characterId}?step=${step}`, {
        scroll: false,
      });
    }
  };

  const nextStep = () => goToStep(currentStep + 1);
  const prevStep = () => goToStep(currentStep - 1);

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();

      const { art, token_art, main_theme_ogg, combat_theme_ogg, ...jsonData } =
        formData;

      formDataToSend.append("id", characterId);
      formDataToSend.append("data", JSON.stringify(jsonData));

      if (art instanceof File) formDataToSend.append("art", art);
      if (token_art instanceof File)
        formDataToSend.append("token_art", token_art);
      if (main_theme_ogg instanceof File)
        formDataToSend.append("main_theme_ogg", main_theme_ogg);
      if (combat_theme_ogg instanceof File)
        formDataToSend.append("combat_theme_ogg", combat_theme_ogg);

      const res = await fetch("/api/characters/update", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await res.json();
      if (result.success) {
        alert("Character updated!");
        router.push("/characters-maker");
      } else {
        alert("Error updating character: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update character.");
    }
  };

  if (loading || !formData) {
    return (
      <main className="max-w-6xl w-full mx-auto px-4 py-8 text-white min-h-screen flex items-center justify-center">
        <p>Loading character...</p>
      </main>
    );
  }

  const CurrentComponent = steps[currentStep].component;

  return (
    <main className="max-w-6xl w-full mx-auto px-4 py-8 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Character</h1>

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
          data={formData}
          onChange={handleChange}
          mode={talesMode}
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
