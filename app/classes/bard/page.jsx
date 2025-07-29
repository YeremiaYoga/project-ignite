import BardTable from "./BardTable";
import BardFeatures from "./BardFeatures";
import ClassHeader from "@/components/ClassHeaderName";
export default function BardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-[#0f172a] px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-left border-b border-gray-700 pb-2">
          <ClassHeader className="bard" />
        </header>

        <section className="text-gray-300 space-y-4">
          <p className="italic font-medium">
            Whether scholar, skald, or scoundrel, a bard weaves magic through
            words and music to inspire allies, demoralize foes, manipulate
            minds, create illusions, and even heal wounds. The bard is a master
            of song, speech, and the magic they contain.
          </p>

          <p className="text-sm text-gray-400 italic">
            You must have a Charisma score of 13 or higher in order to
            multiclass in or out of this class.
          </p>
        </section>

        <div>
          <BardTable />
        </div>
        <div>{/* <BardFeatures /> */}</div>
      </div>
    </main>
  );
}
