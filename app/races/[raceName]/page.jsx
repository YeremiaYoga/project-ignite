import RaceDetail from "./RaceDetail";
import RaceSubrace from "./RaceSubrace";

export default async function RacePage({ params }) {
  const { raceName } = await params;
  const normalizedRaceName = raceName.replace(/-/g, "_");

  try {
    const raceRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/races/key/${normalizedRaceName}`,
      { cache: "no-store" }
    );

    if (!raceRes.ok) throw new Error("Failed to fetch race data");
    const raceDetail = await raceRes.json();

    const subraceRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/subraces/race/${raceDetail.id}`,
      { cache: "no-store" }
    ).catch(() => null);

    const raceSubrace =
      subraceRes && subraceRes.ok ? await subraceRes.json() : [];

    return (
      <main className="min-h-screen sm:px-6 py-8 sm:py-10">
        <div className="mx-auto space-y-6 sm:space-y-8 max-w-6xl">
          <div className="overflow-x-auto">
            <RaceDetail data={raceDetail} />
          </div>

          {raceSubrace.length > 0 && (
            <div>
              <RaceSubrace data={raceSubrace} />
            </div>
          )}
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
