"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";

import Step1Desktop from "@/components/characterSteps/Step1";
import Step2Desktop from "@/components/characterSteps/Step2";
import Step3Desktop from "@/components/characterSteps/Step3";
import Step4Desktop from "@/components/characterSteps/Step4";
import Step5Desktop from "@/components/characterSteps/Step5";

const Step1Mobile = dynamic(() =>
  import("@/components/characterSteps/mobile/Step1")
);
const Step2Mobile = dynamic(() =>
  import("@/components/characterSteps/mobile/Step2")
);
const Step3Mobile = dynamic(() =>
  import("@/components/characterSteps/mobile/Step3")
);
const Step4Mobile = dynamic(() =>
  import("@/components/characterSteps/mobile/Step4")
);
const Step5Mobile = dynamic(() =>
  import("@/components/characterSteps/mobile/Step5")
);

export default function CharacterFormPage({ mode = "create" }) {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const searchParams = useSearchParams();
  const initialStep = parseInt(searchParams.get("step") || "0", 10);

  const [currentStep, setCurrentStep] = useState(initialStep);
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(mode === "edit");
  const [isMobile, setIsMobile] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const steps = [
    { title: "Step 1", component: isMobile ? Step1Mobile : Step1Desktop },
    { title: "Step 2", component: isMobile ? Step2Mobile : Step2Desktop },
    { title: "Step 3", component: isMobile ? Step3Mobile : Step3Desktop },
    { title: "Step 4", component: isMobile ? Step4Mobile : Step4Desktop },
    { title: "Step 5", component: isMobile ? Step5Mobile : Step5Desktop },
  ];

  useEffect(() => {
    if (mode !== "edit" || !id) {
      setFormData(getDefaultForm());
      return;
    }

    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/characters/private/${id}`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to load character");
        }

        const json = await res.json();
        const charData = json.data || json;

        setFormData({
          ...getDefaultForm(),
          ...charData,
          height: charData.height || { feet: 0, inch: 0, centimeter: 0 },
          weight: charData.weight || { pounds: 0, kilogram: 0 },
          size: charData.size || { general: "Medium", vtt_size: "med" },
          main_resident: charData.main_resident || {
            resident: "",
            country: "",
          },
        });
      } catch (err) {
        console.error("❌ Error fetching character:", err);
        alert("Failed to load character data.");
        router.push("/characters-maker");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [mode, id]);

  // ✅ Handle perubahan field
  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  // ✅ Navigasi antar step
  const goToStep = (step) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
      const basePath =
        mode === "edit"
          ? `/characters-maker/edit/${id}`
          : `/characters-maker/create`;
      router.push(`${basePath}?step=${step}`, { scroll: false });
    }
  };

  const nextStep = () => goToStep(currentStep + 1);
  const prevStep = () => goToStep(currentStep - 1);

  // ✅ Simpan character
  // Helper: cek apakah URL YouTube
  const isYoutubeUrl = (url) => {
    if (!url) return true; // optional (kosong = lewati cek)
    const str = String(url).trim().toLowerCase();
    return str.includes("youtube.com") || str.includes("youtu.be");
  };

  // Helper: ambil YouTube video ID
  const extractYoutubeId = (url) => {
    if (!url) return null;
    const patterns = [
      /(?:youtube\.com\/.*v=)([^&#]+)/,
      /youtu\.be\/([^&#]+)/,
      /youtube\.com\/embed\/([^&#]+)/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) return match[1].substring(0, 11); // jaga panjang
    }
    return null;
  };

  const handleSubmit = async () => {
    try {
      if (!formData) return;

      const mainThemeId = extractYoutubeId(formData.main_theme);
      const combatThemeId = extractYoutubeId(formData.combat_theme);

      if (
        formData.main_theme &&
        (!isYoutubeUrl(formData.main_theme) || !mainThemeId)
      ) {
        alert(
          "Main Theme must be a valid YouTube link with a valid video ID."
        );
        return;
      }

      if (
        formData.combat_theme &&
        (!isYoutubeUrl(formData.combat_theme) || !combatThemeId)
      ) {
        alert(
          "Combat Theme must be a valid YouTube link with a valid video ID."
        );
        return;
      }


      setSaving(true);

      const form = new FormData();
      form.append("data", JSON.stringify(formData));

      ["art", "token_art", "main_theme_ogg", "combat_theme_ogg"].forEach(
        (f) => {
          if (formData[f] instanceof File) form.append(f, formData[f]);
        }
      );

      const url =
        mode === "edit"
          ? `${BASE_URL}/characters/${id}`
          : `${BASE_URL}/characters/save`;

      const res = await fetch(url, {
        method: mode === "edit" ? "PUT" : "POST",
        credentials: "include",
        body: form,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Save failed");

      alert(
        `✅ Character ${mode === "edit" ? "updated" : "saved"} successfully!`
      );
      router.replace("/characters-maker");
    } catch (err) {
      console.error("❌ Save error:", err);
      alert("❌ Failed to save character: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !formData)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading character data...
      </div>
    );

  const CurrentComponent = steps[currentStep].component;

  return (
    <main className="mx-auto w-full px-3 sm:max-w-6xl sm:px-6 py-6 sm:py-8 text-white min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 mb-6">
        <button
          onClick={() => router.push("/characters-maker")}
          className="w-full sm:w-auto px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded shadow text-sm"
        >
          ← Back
        </button>

        <h1 className="text-xl sm:text-2xl font-bold text-center flex-1">
          {mode === "edit" ? "Edit Character" : "Create Character"}
        </h1>

        <div className="hidden sm:block w-[80px]" />
      </div>

      {/* STEP INDICATOR */}
      <div className="flex justify-center flex-wrap mb-6 gap-2">
        {steps.map((_, idx) => (
          <div
            key={idx}
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

      {/* STEP CONTENT */}
      <div className="p-4 sm:p-6 rounded-lg shadow bg-[#0b1230] border border-slate-700">
        {currentStep === steps.length - 1 &&
        formData?.character_type?.toLowerCase() === "player" ? (
          <div className="text-center py-10">
            <p className="text-yellow-300 text-lg font-semibold mb-2">
              ⚠️ Step 5 is only available for NPC characters.
            </p>
            <p className="text-gray-300 text-sm">
              Players do not have access to this configuration step.
            </p>
          </div>
        ) : (
          <CurrentComponent
            data={formData}
            allData={formData}
            onChange={handleChange}
          />
        )}
      </div>

      {/* NAVIGATION BUTTONS */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`w-full sm:w-auto px-4 py-2 rounded shadow ${
            currentStep === 0
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Previous
        </button>

        <div className="flex flex-col sm:flex-row gap-3">
          {currentStep === steps.length - 1 &&
          formData?.character_type?.toLowerCase() === "player" ? (
            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto px-4 py-2 bg-green-600 hover:bg-green-700 rounded shadow"
            >
              Finish
            </button>
          ) : (
            <>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className={`w-full sm:w-auto px-4 py-2 rounded shadow ${
                  saving
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
              >
                {saving ? "Saving..." : "Save"}
              </button>

              {currentStep === steps.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="w-full sm:w-auto px-4 py-2 bg-green-600 hover:bg-green-700 rounded shadow"
                >
                  Finish
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded shadow"
                >
                  Next
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

// ✅ Default form factory (tanpa perubahan)
function getDefaultForm() {
  return {
    name: "",
    full_name: "",
    full_name_visibility: false,
    art: "",
    token_art: "",
    private_id: "",
    race_id: "",
    subrace_id: "",
    background_id: "",
    public_id: "",
    character_type: "",
    alignment: "",
    status: "",
    birth_year: "",
    birth_year_type: "",
    death_year: "",
    death_year_type: "",
    birth_place: "",
    birth_country: "",
    gender: "",
    pronoun: "",
    height: { feet: 0, inch: 0, centimeter: 0 },
    weight: { pounds: 0, kilogram: 0 },
    skin_colour: "",
    hair: "",
    wiki_visibility: false,
    weight_unit: "imperial",
    height_unit: "imperial",
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
    appearance_visibility: false,
    appearance: "",
    main_theme: "",
    main_theme_ogg: "",
    combat_theme: "",
    combat_theme_ogg: "",
    nationality: "",
    main_resident: { resident: "", country: "" },
    notable_details: [],
    current_occupation: [],
    previous_occupation: [],
    other_resident: [],
    hobbies_visibility: false,
    hobbies: [],
    signature_object: [],
    signature_weapon: [],
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
    size: { general: "Medium", vtt_size: "med" },
    creature_type: "Humanoid",
    personality_combat_style: "",
    skill_prof: [],
    incumbency_id: "",
  };
}
