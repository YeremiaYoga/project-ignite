import path from "path";
import fs from "fs/promises";
import RaceDetail from "./RaceDetail";
import RaceSubrace from "./RaceSubrace";

export default async function RacePage({ params }) {
  const { raceName } = await params;
  const normalizedRaceName = raceName.replace(/-/g, "_");

  try {
    const dataDir = path.join(
      process.cwd(),
      "data",
      "races",
      normalizedRaceName
    );

    const raceDetailRaw = await fs.readFile(
      path.join(dataDir, `${normalizedRaceName}Detail.json`),
      "utf-8"
    );
    const raceSubraceRaw = await fs
      .readFile(
        path.join(dataDir, `${normalizedRaceName}Subrace.json`),
        "utf-8"
      )
      .catch(() => null);

    const raceDetail = JSON.parse(raceDetailRaw);
    const raceSubrace = raceSubraceRaw ? JSON.parse(raceSubraceRaw) : null;

    return (
      <main className="min-h-screen sm:px-6  py-8 sm:py-10">
        <div className="mx-auto space-y-6 sm:space-y-8 max-w-6xl">
          <div className="overflow-x-auto">
            <RaceDetail data={raceDetail} />
          </div>
          <div>
            <RaceSubrace data={raceDetail} />
          </div>
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
