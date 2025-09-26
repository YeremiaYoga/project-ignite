import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const charactersDir = path.join(process.cwd(), "data", "characters");

    if (!fs.existsSync(charactersDir)) {
      return NextResponse.json([]);
    }

    const folders = fs
      .readdirSync(charactersDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory());

    const characters = folders
      .map((folder) => {
        const folderPath = path.join(charactersDir, folder.name);
        const filePath = path.join(folderPath, `${folder.name}Data.json`);

        if (!fs.existsSync(filePath)) return null;

        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        return data;
      })
      .filter(Boolean);

    return NextResponse.json(characters);
  } catch (err) {
    console.error("Error reading characters:", err);
    return NextResponse.json(
      { error: "Failed to read characters" },
      { status: 500 }
    );
  }
}
