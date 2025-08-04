import RogueTable from "./RogueTable";
import RogueFeatures from "./RogueFeatures";
import ClassHeader from "@/components/ClassHeaderName";
export default function RoguePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-[#0f172a] px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-left border-b border-gray-700 pb-2">
            <ClassHeader className="rogue" />
        </header>

        <section className="text-gray-300 space-y-4">
          <p className="italic font-medium">
            Rogues rely on skill, stealth, and their foes' vulnerabilities to
            get the upper hand in any situation. They have a knack for finding
            the solution to just about any problem, demonstrating a
            resourcefulness and versatility that is the cornerstone of any
            successful adventuring party.
          </p>

          <p className="text-sm text-gray-400 italic">
            You must have a Dexterity score of 13 or higher in order to
            multiclass in or out of this class.
          </p>
        </section>

        <div>
          <RogueTable />
        </div>
        <div>{/* <RogueFeatures /> */}</div>
      </div>
    </main>
  );
}
