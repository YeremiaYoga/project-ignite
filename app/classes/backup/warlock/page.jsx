import WarlockTable from "./WarlockTable";
import WarlockFeatures from "./WarlockFeatures";
import ClassHeader from "@/components/ClassHeaderName";
export default function WarlockPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-[#0f172a] px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-left border-b border-gray-700 pb-2">
            <ClassHeader className="warlock" />
        </header>

        <section className="text-gray-300 space-y-4">
          <p className="italic font-medium">
            Warlocks are seekers of the knowledge that lies hidden in the fabric
            of the multiverse. Through pacts made with mysterious beings of
            supernatural power, warlocks unlock magical effects both subtle and
            spectacular.
          </p>

          <p className="text-sm text-gray-400 italic">
            You must have a Charisma score of 13 or higher in order to
            multiclass in or out of this class.
          </p>
        </section>

        <div>
          <WarlockTable />
        </div>
        <div>{/* <WarlockFeatures /> */}</div>
      </div>
    </main>
  );
}
