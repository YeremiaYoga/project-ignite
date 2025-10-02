"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Cookies from "js-cookie";
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
  const { user, isSignedIn, isLoaded } = useUser();
  const [talesMode, setTalesMode] = useState(false);
  const [apiMode, setApiMode] = useState(false);
  const creatorName = user?.fullName || user?.username || "";
  const creatorEmail = user?.primaryEmailAddress?.emailAddress || "";

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setFormData((prev) => ({
        ...prev,
        step1: {
          ...prev.step1,
          creator_name: user.fullName || user.username || "",
          creator_email: user.primaryEmailAddress?.emailAddress || "",
        },
      }));
    }
  }, [isLoaded, isSignedIn, user]);
  const [formData, setFormData] = useState({
    step1: {
      name: "",
      fullname: "",
      art: "",
      token_art: "",
      creator_name: creatorName,
      creator_email: creatorEmail,
      uuid: "",
      race: "",
      subrace: "",
      background: "",
      character_type: "",
      alignment: "",
      status: "",
      birth_year: 0,
      birth_year_type: "",
      death_year: 0,
      death_year_type: "",
      birth_place: "",
      birth_country: "",
      gender: "",
      pronoun: "",
      height: { feet: "", inch: "", centimeter: "" },
      weight: { pounds: "", kilogram: "" },
      skin_colour: "",
      hair: "",
      wiki_visibility: false,
    },
    step2: {
      backstory_visibility: false,
      backstory: "",
      voice_style: "",
      wayfarer: "",
      personality_traits: [],
      main_personality: "",
      detailed_personality: [],
      titles: [],
      fear_weakness_visibility: false,
      fear_weakness: [],
      motivation_visibility: false,
      motivation: [],
      previous_economical_standing: "",
      current_last_economical_standing: "",
      previous_social_classes: "",
      current_social_classes: "",
     
    },
    step3: {
      appearance_visibility: false,
      appearance: "",
      main_theme: "",
      main_theme_ogg: "",
      combat_theme: "",
      combat_theme_ogg: "",
      nationality: "",
      main_resident: {
        resident: "",
        country: "",
      },
      notable_details: [],
      current_occupation: [],
      previous_occupation: [],
      other_resident: [],
      hobbies_visibility: false,
      hobbies: [],
      signature_object: [],
      signature_weapon: [],
    },
    step4: {
      notable_accomplishments: [],
      connection_towards_events: [],
      notable_quotes: "",
      quotes_from_others: [],
      family: [],
      allies: [],
      friends: [],
      enemies: [],
      subordinates: [],
      affiliations: [],
      special_relationship: [],
    },
    step5: {
      combat_value: 0,
      vision: "",
      disposition: "",
      damage_type: "",
      str: 0,
      dex: 0,
      con: 0,
      int: 0,
      wis: 0,
      cha: 0,
      size: {
        general: "Medium",
        vtt_size: "med",
      },
      creature_type: "Humanoid",
      personality_combat_style: "",
      skill_prof: [],
    },
  });

  console.log(formData);
  useEffect(() => {
    const mode = Cookies.get("ignite-tales-mode");
    setTalesMode(mode === "true");
    const apimode = Cookies.get("ignite-api-mode");
    setApiMode(apimode === "true");
  }, []);
  const isNameFilled = () => formData.step1.name.trim() !== "";
  const steps = [
    { title: "Step 1", component: Step1, key: "step1" },
    { title: "Step 2", component: Step2, key: "step2" },
    { title: "Step 3", component: Step3, key: "step3" },
    { title: "Step 4", component: Step4, key: "step4" },
    { title: "Step 5", component: Step5, key: "step5" },
  ];

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/characters-maker");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (!isSignedIn) {
    return null;
  }
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

  const nextStep = () => {
    if (!isNameFilled()) {
      alert("Name is required.");
      return;
    }
    goToStep(currentStep + 1);
  };
  const prevStep = () => goToStep(currentStep - 1);

  const handleSubmit = async () => {
    if (!isNameFilled()) {
      alert("Name is required.");
      return;
    }

    try {
      const formDataToSend = new FormData();

      const mergedData = {
        ...formData.step1,
        ...formData.step2,
        ...formData.step3,
        ...formData.step4,
        ...formData.step5,
      };

      const { art, token_art, main_theme_ogg, combat_theme_ogg, ...jsonData } =
        mergedData;
      formDataToSend.append("data", JSON.stringify(jsonData));
      if (art instanceof File) {
        formDataToSend.append("art", art);
      }
      if (token_art instanceof File) {
        formDataToSend.append("token_art", token_art);
      }
      if (main_theme_ogg instanceof File) {
        formDataToSend.append("main_theme_ogg", main_theme_ogg);
      }
      if (combat_theme_ogg instanceof File) {
        formDataToSend.append("combat_theme_ogg", combat_theme_ogg);
      }

      const res = await fetch("/api/characters/save", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await res.json();
      if (result.success) {
        alert("Character saved!");
      } else {
        alert("Error saving character: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save character.");
    }
  };
  const submitBackend = async () => {
    if (!isNameFilled()) {
      alert("Name is required.");
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Gabung semua step data
      const mergedData = {
        ...formData.step1,
        ...formData.step2,
        ...formData.step3,
        ...formData.step4,
        ...formData.step5,
      };

      // Pisahkan file
      const { art, token_art, main_theme_ogg, combat_theme_ogg, ...jsonData } =
        mergedData;

  
      // Append JSON data
      formDataToSend.append("data", JSON.stringify(jsonData));

      // Append file kalau ada
      if (art instanceof File) {
        formDataToSend.append("art", art);
      }
      if (token_art instanceof File) {
        formDataToSend.append("token_art", token_art);
      }
      if (main_theme_ogg instanceof File) {
        formDataToSend.append("main_theme_ogg", main_theme_ogg);
      }
      if (combat_theme_ogg instanceof File) {
        formDataToSend.append("combat_theme_ogg", combat_theme_ogg);
      }

      // 🔑 arahkan ke backend (pakai apiMode kalau perlu)
      const url = apiMode
        ? `${process.env.NEXT_PUBLIC_API_URL}/characters/save`
        : "/api/characters/save";

      for (let [key, value] of formDataToSend.entries()) {
  console.log(key, value);
}
      const res = await fetch(url, {
        method: "POST",
        body: formDataToSend,
        credentials: "include", // biar cookie userId ikut
      });

      const result = await res.json();
      if (res.ok) {
        alert("Character saved!");
        console.log("Saved character:", result);
      } else {
        alert("Error saving character: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save character.");
    }
  };

  const CurrentComponent = steps[currentStep].component;
  const stepKey = steps[currentStep].key;
  const stepData = formData[stepKey];

  const renderStepContent = () => {
    const stepKey = steps[currentStep].key;
    const stepData = formData[stepKey];

    if (stepKey === "step5") {
      const type = formData.step1.character_type;

      if (!type) {
        return (
          <div className="text-center text-red-400 font-semibold">
            Please select character type first.
          </div>
        );
      }

      if (type.toLowerCase() === "player") {
        return (
          <div className="w-full h-[60vh] flex flex-col items-center justify-center bg-black/80 rounded-lg p-6">
            <p className="text-lg md:text-xl font-semibold text-gray-200 text-center mb-6">
              The Character Builder for Player Character will be released Q1
              2026
            </p>
            <button
              onClick={apiMode ? submitBackend : handleSubmit}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded shadow"
            >
              Save
            </button>
          </div>
        );
      }

      return (
        <CurrentComponent
          data={stepData}
          allData={formData}
          onChange={(field, value) => handleChange(stepKey, field, value)}
          mode={talesMode}
        />
      );
    }

    return (
      <CurrentComponent
        data={stepData}
        allData={formData}
        onChange={(field, value) => handleChange(stepKey, field, value)}
        mode={talesMode}
      />
    );
  };

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

      <div className="p-6 rounded-lg shadow mb-6">{renderStepContent()}</div>

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
            onClick={apiMode ? submitBackend : handleSubmit}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded shadow"
          >
            Save
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={apiMode ? submitBackend : handleSubmit}
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
