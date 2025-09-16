"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MultipleInput from "@/components/MultipleInput";
import FormField from "@/components/FormField";

export default function CreateNPCPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    full_name: "",
    creator_name: "",
    art: "",
    main_theme: "",

    race: "",
    subrace: "",
    main_affiliation: "",
    alligment: "",
    titles: [],
    place_of_resident: [],
    follower: [],
    signature_object: [],
    signature_weapon: [],

    fighthing_style: "",
    battle_rating: 0,
    voice_style: "",

    main_personality_trait: "",
    detailed_personality: [],
    personality_type: [],
    fears_weaknesses: [],

    occupation_role: [],
    previous_occupation_role: [],
    notable_accomplishments: [],

    status: "",
    birth_year: "",
    birth_year_type: "",
    death_year: "",
    death_year_type: "",
    birth_location: "",

    appearance: "",
    notable_details: "",
    backstory: "",

    allies: [],
    friends: [],
    enemies: [],
    alive_family_member: [],
    dead_family_member: [],
    subordinates: [],

    notable_quotes: "",
    quotes_from_others: [["", ""]],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleQuotesChange = (index, field, value) => {
    const updated = [...form.quotes_from_others];
    updated[index][field] = value;
    setForm({ ...form, quotes_from_others: updated });
  };

  const addQuote = () => {
    setForm({
      ...form,
      quotes_from_others: [...form.quotes_from_others, ["", ""]],
    });
  };

  const removeQuote = (index) => {
    const updated = [...form.quotes_from_others];
    updated.splice(index, 1);
    setForm({ ...form, quotes_from_others: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("NPC Created:", form);
    alert("✅ NPC Created! Lihat console untuk JSON.");
    router.push("/npcmaker");
  };

  return (
    <main className="max-w-6xl w-full mx-auto px-6 py-8 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create NPC</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {[
          { name: "name", label: "Name" },
          { name: "full_name", label: "Full Name" },
          { name: "art", label: "Art" },
          { name: "main_theme", label: "Main Theme" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block mb-1">{field.label}</label>
            <FormField
              field={field}
              value={form[field.name]}
              onChange={handleChange}
            />
          </div>
        ))}

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded shadow"
          >
            Save NPC
          </button>
        </div>
      </form>
    </main>
  );
}
