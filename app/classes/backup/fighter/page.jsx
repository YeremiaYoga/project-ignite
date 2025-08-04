import FighterTable from "./FighterTable";
import FighterFeatures from "./FighterFeatures";
import ClassHeader from "@/components/ClassHeaderName";
export default function FighterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-[#0f172a] px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-left border-b border-gray-700 pb-2">
           <ClassHeader className="fighter" />
        </header>

        <section className="text-gray-300 space-y-4">
          <p className="italic font-medium">
            Fighters share an unparalleled mastery with weapons and armor, and a
            thorough knowledge of the skills of combat. They are well acquainted
            with death, both meting it out and staring it defiantly in the face.
          </p>

          <p className="text-sm text-gray-400 italic">
            You must have a Dexterity or Strength score of 13 or higher in order
            to multiclass in or out of this class.
          </p>
        </section>

        <div>
          <FighterTable />
        </div>
        <div>{/* <FighterFeatures /> */}</div>
      </div>
    </main>
  );
}
