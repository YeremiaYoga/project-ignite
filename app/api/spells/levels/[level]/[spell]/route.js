import { promises as fs } from "fs";
import path from "path";

export async function GET(req, context) {
  try {
    const params = await context.params;
    const { level, spell } = params;

    const spellPath = path.join(
      process.cwd(),
      "data/spells",
      level,
      `${spell}.json`
    );
    try {
      await fs.access(spellPath);
    } catch {
      return new Response(JSON.stringify({ error: "Spell not found" }), {
        status: 404,
      });
    }

    const file = await fs.readFile(spellPath, "utf-8");
    const data = JSON.parse(file);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
