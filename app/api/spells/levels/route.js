import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const levelsDir = path.join(process.cwd(), "data/spells");
    const levels = fs.readdirSync(levelsDir).filter((f) =>
      fs.statSync(path.join(levelsDir, f)).isDirectory()
    );

    return new Response(JSON.stringify(levels), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
