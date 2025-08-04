import DruidTable from "./DruidTable";
import DruidFeatures from "./DruidFeatures";
import ClassHeader from "@/components/ClassHeaderName";
export default function DruidPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-[#0f172a] px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-left border-b border-gray-700 pb-2">
          <ClassHeader className="druid" />
        </header>

        <section className="text-gray-300 space-y-4">
          <p className="italic font-medium">
            Whether calling on the elemental forces of nature or emulating the
            creatures of the animal world, druids are an embodiment of nature's
            resilience, cunning, and fury. They claim no mastery over nature,
            but see themselves as extensions of nature's indomitable will.
          </p>

          <p className="text-sm text-gray-400 italic">
            You must have a Wisdom score of 13 or higher in order to multiclass
            in or out of this class.
          </p>
        </section>

        <div>
          <DruidTable />
        </div>
        <div>{/* <BardFeatures /> */}</div>
      </div>
    </main>
  );
}
