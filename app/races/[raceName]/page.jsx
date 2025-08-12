import path from "path";
import fs from "fs/promises";
import RaceDetail from "./RaceDetail";
import RaceSubrace from "./RaceSubrace";

export default async function RacePage({ params }) {
  const { raceName } = await params;
  const normalizedRaceName = raceName.replace(/-/g, "_");

  try {
    // Path ke folder data di root 'data/races'
    const dataDir = path.join(process.cwd(), "data", "races", normalizedRaceName);

    // Baca file JSON secara async
    const raceDetailRaw = await fs.readFile(path.join(dataDir, `${normalizedRaceName}Detail.json`), "utf-8");
    const raceSubraceRaw = await fs.readFile(path.join(dataDir, `${normalizedRaceName}Subrace.json`), "utf-8").catch(() => null);

    const raceDetail = JSON.parse(raceDetailRaw);
    const raceSubrace = raceSubraceRaw ? JSON.parse(raceSubraceRaw) : null;

    return (
      <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          <div className="overflow-x-auto">
            <RaceDetail data={raceDetail} />
          </div>

          {raceSubrace && <RaceSubrace data={raceSubrace} />}
        </div>
      </main>
    );
  } catch (err) {
    return (
      <main className="p-6 text-red-500">
        <h1>Error loading race: {normalizedRaceName}</h1>
        <p>{err.message}</p>
      </main>
    );
  }
}
