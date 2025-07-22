import ArtificerTable from "./ArtificerTable";
import ArtificerFeatures from "./ArtificerFeatures";

export default function ArtificerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-[#0f172a] px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-left border-b border-gray-700 pb-2">
          <h1 className="text-4xl font-bold text-blue-400">Artificer</h1>
        </header>

        <section className="text-gray-300 space-y-4">
          <p className="italic font-medium">
            Masters of invention, artificers use ingenuity and magic to unlock
            extraordinary capabilities in objects. They see magic as a complex
            system waiting to be decoded and then harnessed in their spells and
            inventions. You can find everything you need to play one of these
            inventors in the next few sections.
          </p>
          <p className="italic font-medium">
            Artificers use a variety of tools to channel their arcane power. To
            cast a spell, an artificer might use alchemist’s supplies to create
            a potent elixir, calligrapher’s supplies to inscribe a sigil of
            power, or tinker’s tools to craft a temporary charm. The magic of
            artificers is tied to their tools and their talents, and few other
            characters can produce the right tool for a job as well as an
            artificer.
          </p>
          <p className="text-sm text-gray-400 italic">
            You must have an Intelligence score of 13 or higher in order to
            multiclass in or out of this class.
          </p>
        </section>

        <section>
          <ArtificerTable />
        </section>
        <section>
          <ArtificerFeatures />
        </section>
      </div>
    </main>
  );
}
