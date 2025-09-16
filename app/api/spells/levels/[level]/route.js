import fs from "fs";
import path from "path";

export async function GET(req, context) {
  try {
    const params = await context.params;
    const { level } = params;

    const levelDir = path.join(process.cwd(), "data/spells", level);
    if (!fs.existsSync(levelDir)) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    const spells = fs
      .readdirSync(levelDir)
      .filter((f) => f.endsWith(".json"))
      .map((f) => f.replace(".json", ""));

    return new Response(JSON.stringify(spells), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

