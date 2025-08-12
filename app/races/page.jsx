import fs from "fs";
import path from "path";
import RaceCard from "./RaceCard";

export default function RacesPage() {
  const racesDir = path.join(process.cwd(), "data", "races");

  const raceFolders = fs.readdirSync(racesDir).filter((folder) => {
    const fullPath = path.join(racesDir, folder);
    return fs.statSync(fullPath).isDirectory();
  });

  const raceDataList = raceFolders
    .map((folder) => {
      const filePath = path.join(racesDir, folder, `${folder}Data.json`);
      try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const jsonData = JSON.parse(fileContent);
        return {
          raceName: folder,
          ...jsonData,
        };
      } catch (err) {
        console.error(`Error reading ${filePath}:`, err);
        return null;
      }
    })
    .filter(Boolean);

  return (
    <div className="p-6 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Races</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
        {raceDataList.map((race) => (
          <RaceCard key={race.raceName} race={race} />
        ))}
      </div>
    </div>
  );
}
