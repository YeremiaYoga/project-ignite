import SorcererTable from "./SorcererTable";
import SorcererFeatures from "./SorcererFeatures";
import ClassHeader from "@/components/ClassHeaderName";
export default function SorcererPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-[#0f172a] px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-left border-b border-gray-700 pb-2">
          <ClassHeader className="sorcerer" />
        </header>

        <section className="text-gray-300 space-y-4">
          <p className="italic font-medium">
            Sorcerers carry a magical birthright conferred upon them by an
            exotic bloodline, some otherworldly influence, or exposure to
            unknown cosmic forces. No one chooses sorcery; the power chooses the
            sorcerer.
          </p>

          <p className="text-sm text-gray-400 italic">
            You must have a Charisma score of 13 or higher in order to
            multiclass in or out of this class.
          </p>
        </section>

        <div>
          <SorcererTable />
        </div>
        <div>{/* <SorcererFeatures /> */}</div>
      </div>
    </main>
  );
}
