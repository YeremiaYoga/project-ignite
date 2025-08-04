import RangerTable from "./RangerTable";
import RangerFeatures from "./RangerFeatures";
import ClassHeader from "@/components/ClassHeaderName";
export default function RangerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-[#0f172a] px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-left border-b border-gray-700 pb-2">
          <ClassHeader className="ranger" />
        </header>

        <section className="text-gray-300 space-y-4">
          <p className="italic font-medium">
            Far from the bustle of cities and towns, past the hedges that
            shelter the most distant farms from the terrors of the wild, amid
            the dense-packed trees of trackless forests and across wide and
            empty plains, rangers keep their unending watch.
          </p>

          <p className="text-sm text-gray-400 italic">
            You must have a Dexterity score and a Wisdom score of 13 or higher
            in order to multiclass in or out of this class.
          </p>
        </section>

        <div>
          <RangerTable />
        </div>
        <div>{/* <RangerFeatures /> */}</div>
      </div>
    </main>
  );
}
