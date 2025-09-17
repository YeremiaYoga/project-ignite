"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/FormField";
import MultipleInput from "@/components/MultipleInput";
import { useUser } from "@clerk/nextjs";

export default function CreateNPCPage() {
  const router = useRouter();
  const { user } = useUser();

  const [form, setForm] = useState({
    name: "",
    full_name: "",
    creator_name: "",
    creator_email: "",
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

    fighting_style: "",
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
    quotes_from_others: [],
  });

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        creator_name: user.fullName || "",
        creator_email: user.emailAddresses?.[0]?.emailAddress || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (field, values) => {
    setForm({ ...form, [field]: values });
  };

  const handleQuoteChange = (index, key, value) => {
    const updated = [...form.quotes_from_others];
    updated[index][key] = value;
    setForm({ ...form, quotes_from_others: updated });
  };

  const addQuote = () => {
    setForm({
      ...form,
      quotes_from_others: [
        ...form.quotes_from_others,
        { quote: "", author: "" },
      ],
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
    alert("✅ NPC Created! Check console for JSON.");
    router.push("/npcmaker");
  };

  const arrayFields = [
    { label: "Titles", field: "titles" },
    { label: "Place of Residence", field: "place_of_resident" },
    { label: "Follower", field: "follower" },
    { label: "Signature Objects", field: "signature_object" },
    { label: "Signature Weapons", field: "signature_weapon" },

  ];

  return (
    <main className="max-w-6xl w-full mx-auto px-6 py-8 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create NPC</h1>
      <form onSubmit={handleSubmit} className="space-y-6">


        {[
          { name: "name", label: "Name" },
          { name: "full_name", label: "Full Name" },
          { name: "art", label: "Art" },
          { name: "main_theme", label: "Main Theme" },
          { name: "race", label: "Race" },
          { name: "subrace", label: "Subrace" },
          { name: "main_affiliation", label: "Main Affiliation" },
          { name: "alligment", label: "Alignment" },
          { name: "fighting_style", label: "Fighting Style" },
          { name: "battle_rating", label: "Battle Rating" },
          { name: "voice_style", label: "Voice Style" },
          { name: "main_personality_trait", label: "Main Personality Trait" },
          { name: "appearance", label: "Appearance" },
          { name: "notable_details", label: "Notable Details" },
          { name: "backstory", label: "Backstory" },
          { name: "status", label: "Status" },
          { name: "birth_year", label: "Birth Year" },
          { name: "birth_year_type", label: "Birth Year Type" },
          { name: "death_year", label: "Death Year" },
          { name: "death_year_type", label: "Death Year Type" },
          { name: "birth_location", label: "Birth Location" },
          { name: "notable_quotes", label: "Notable Quotes" },
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

     
        {arrayFields.map(({ label, field }) => (
          <div key={field} className="mb-4">
            <MultipleInput
              labels={label}
              label={label.slice(0, -1)}
              items={form[field] || []}
              onChange={(values) => setForm({ ...form, [field]: values })}
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
