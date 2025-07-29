import ClericTable from "./ClericTable";
import ClericFeatures from "./ClericFeatures";
import ClassHeader from "@/components/ClassHeaderName";

export default function ClericPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-[#0f172a] px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-left border-b border-gray-700 pb-2">
           <ClassHeader className="cleric" />
        </header>

        <section className="text-gray-300 space-y-4">
          <p className="italic font-medium">
            Clerics are intermediaries between the mortal world and the distant
            planes of the gods. As varied as the gods they serve, clerics strive
            to embody the handiwork of their deities. No ordinary priest, a
            cleric is imbued with divine magic.
          </p>

          <p className="text-sm text-gray-400 italic">
            You must have a Wisdom score of 13 or higher in order to multiclass
            in or out of this class.
          </p>
        </section>

        <div>
          <ClericTable />
        </div>
        <div>{/* <BardFeatures /> */}</div>
      </div>
    </main>
  );
}
