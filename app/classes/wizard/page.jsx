import WizardTable from "./WizardTable";
import WizardFeatures from "./WizardFeatures";
import ClassHeader from "@/components/ClassHeaderName";
export default function WizardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-[#0f172a] px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-left border-b border-gray-700 pb-2">
            <ClassHeader className="wizard" />
        </header>

        <section className="text-gray-300 space-y-4">
          <p className="italic font-medium">
            Wizards are supreme magic-users, defined and united as a class by
            the spells they cast. Drawing on the subtle weave of magic that
            permeates the cosmos, wizards cast spells of explosive fire, arcing
            lightning, subtle deception, brute-force mind control, and much
            more.
          </p>

          <p className="text-sm text-gray-400 italic">
            You must have an Intelligence score of 13 or higher in order to
            multiclass in or out of this class.
          </p>
        </section>

        <div>
          <WizardTable />
        </div>
        <div>{/* <WizardFeatures /> */}</div>
      </div>
    </main>
  );
}
