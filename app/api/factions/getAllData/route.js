export const runtime = "nodejs";

import fs from "fs";
import path from "path";

export async function GET() {
  const baseDir = path.join(process.cwd(), "data", "factions");
  const factionFolders = fs.readdirSync(baseDir);

  const factions = factionFolders.map((folder) => {
    const filePath = path.join(baseDir, folder, `${folder}Data.json`);
    const rawData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(rawData);
  });

  return new Response(JSON.stringify(factions), {
    headers: { "Content-Type": "application/json" },
  });
}
