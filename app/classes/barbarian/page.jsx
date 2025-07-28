import BarbarianTable from "./BarbarianTable";
import BarbarianFeatures from "./BarbarianFeatures";

export default function BarbarianPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-[#0f172a] px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-left border-b border-gray-700 pb-2">
          <h1 className="text-4xl font-bold text-blue-400">Barbarian</h1>
        </header>

        <section className="text-gray-300 space-y-4">
          <p className="italic font-medium">
            For some, their rage springs from a communion with fierce animal
            spirits. Others draw from a roiling reservoir of anger at a world
            full of pain. For every barbarian, rage is a power that fuels not
            just a battle frenzy but also uncanny reflexes, resilience, and
            feats of strength.
          </p>

          <p className="text-sm text-gray-400 italic">
            You must have a Strength score of 13 or higher in order to
            multiclass in or out of this class.
          </p>
        </section>

        <div>
          <BarbarianTable />
        </div>
        <div>
          <BarbarianFeatures />
        </div>
      </div>
    </main>
  );
}
