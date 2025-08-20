import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const racesDir = path.join(process.cwd(), "data", "races");

    const folders = fs
      .readdirSync(racesDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    const races = folders.map((folder) => {
      const filePath = path.join(racesDir, folder, `${folder}Data.json`);
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const jsonData = JSON.parse(fileContent);
        return { raceName: folder, ...jsonData };
      }
      return { raceName: folder, error: "Data file not found" };
    });

    return new Response(JSON.stringify(races), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Failed to load race data:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
