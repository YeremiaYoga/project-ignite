import MonkTable from "./MonkTable";
import MonkFeatures from "./MonkFeatures";
import ClassHeader from "@/components/ClassHeaderName";
export default function MonkPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-[#0f172a] px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-left border-b border-gray-700 pb-2">
            <ClassHeader className="monk" />
        </header>

        <section className="text-gray-300 space-y-4">
          <p className="italic font-medium">
            Monks are united in their ability to magically harness the energy
            that flows in their bodies. Whether channeled as a striking display
            of combat prowess or a subtler focus of defensive ability and speed,
            this energy infuses all that a monk does.
          </p>

          <p className="text-sm text-gray-400 italic">
            You must have a Dexterity score and a Wisdom score of 13 or higher
            in order to multiclass in or out of this class.
          </p>
        </section>

        <div>
          <MonkTable />
        </div>
        <div>{/* <MonkFeatures /> */}</div>
      </div>
    </main>
  );
}
