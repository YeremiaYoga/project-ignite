import path from "path";
import { promises as fs } from "fs";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const factionName = searchParams.get("name"); // ambil query ?name=

    if (!factionName) {
      return new Response(
        JSON.stringify({ error: "Missing ?name parameter" }),
        { status: 400 }
      );
    }

    // otomatis tambahin "Data.json"
    const filePath = path.join(
      process.cwd(),
      "data/factions",
      factionName,
      `${factionName}Data.json`
    );

    try {
      await fs.access(filePath);
    } catch {
      return new Response(
        JSON.stringify({ error: `File not found: ${factionName}Data.json` }),
        { status: 404 }
      );
    }

    const file = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(file);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
