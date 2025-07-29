import PaladinTable from "./PaladinTable";
import PaladinFeatures from "./PaladinFeatures";
import ClassHeader from "@/components/ClassHeaderName";
export default function PaladinPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-[#0f172a] px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-left border-b border-gray-700 pb-2">
          <ClassHeader className="paladin" />
        </header>

        <section className="text-gray-300 space-y-4">
          <p className="italic font-medium">
            Whether sworn before a god's altar and the witness of a priest, in a
            sacred glade before nature spirits and fey beings, or in a moment of
            desperation and grief with the dead as the only witness, a paladin's
            oath is a powerful bond.
          </p>

          <p className="text-sm text-gray-400 italic">
            You must have a Charisma score and a Strength score of 13 or higher
            in order to multiclass in or out of this class.
          </p>
        </section>

        <div>
          <PaladinTable />
        </div>
        <div>{/* <PaladinFeatures /> */}</div>
      </div>
    </main>
  );
}
