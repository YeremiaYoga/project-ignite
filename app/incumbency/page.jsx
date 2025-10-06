import CharacterCard from "@/components/CharacterCard";
import { Skull, Activity } from "lucide-react";

export default function Home() {
  const characterData = {
    name: "Harmonic Virtuoso",
    role: "Support",
    hp: 5,
    ac: "10+Dexterity",
    description:
      "A gentle support who restores health and boosts allies through melodic magic or uplifting words.",
    abilities: [
      {
        icon: Skull, // lucide icon
        title: "Harmonic Unstring",
        type: "Basic • Action • Debuff",
        description:
          "Choose one creature within 60ft. They make a Wisdom saving throw. On failure, they gain disadvantage until the end of your next turn.",
      },
      {
        icon: Activity,
        title: "Melody of Restoration",
        type: "Skill • Action • Healing",
        description:
          "Heal one creature you can see within 60ft for d4s equal to your proficiency bonus.",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <CharacterCard data={characterData} />
    </main>
  );
}
