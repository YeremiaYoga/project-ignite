import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function findCharacterById(baseDir, id) {
  const entries = fs.readdirSync(baseDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(baseDir, entry.name);

    if (entry.isDirectory()) {
      const result = findCharacterById(fullPath, id);
      if (result) return result;
    } else if (entry.isFile() && entry.name.endsWith(".json")) {
      try {
        const rawData = fs.readFileSync(fullPath, "utf-8");
        const data = JSON.parse(rawData);

        if (data?.randomid === id) {
          return data;
        }
      } catch (err) {
        console.error(`Error parsing ${fullPath}:`, err);
      }
    }
  }

  return null;
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing character id" },
        { status: 400 }
      );
    }

    const baseDir = path.join(process.cwd(), "data", "characters");
    const character = findCharacterById(baseDir, id);

    if (!character) {
      return NextResponse.json(
        { error: "Character not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(character);
  } catch (err) {
    console.error("Error fetching character:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
