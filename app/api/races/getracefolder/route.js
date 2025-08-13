import { promises as fs } from "fs";
import path from "path";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const race = searchParams.get("race");

    if (!race) {
      return new Response(JSON.stringify({ error: "Race is required" }), {
        status: 400,
      });
    }
    const filePath = path.join(
      process.cwd(),
      "data",
      "races",
      race,
      `${race}Data.json`
    );

    const fileData = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(fileData);

    return new Response(JSON.stringify(jsonData), { status: 200 });
  } catch (err) {
    console.error("Error reading race data:", err);
    return new Response(JSON.stringify({ error: "Failed to read race data" }), {
      status: 500,
    });
  }
}
