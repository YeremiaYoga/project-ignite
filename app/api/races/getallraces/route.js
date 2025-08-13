import fs from "fs";
import path from "path";

export async function GET() {
  const racesDir = path.join(process.cwd(), "data", "races");
  const folders = fs
    .readdirSync(racesDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  return new Response(JSON.stringify(folders), { status: 200 });
}
