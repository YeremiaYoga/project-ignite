import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const baseDir = path.join(process.cwd(), "data", "incumbency");

    if (!fs.existsSync(baseDir)) {
      return NextResponse.json([]);
    }

    const folders = fs
      .readdirSync(baseDir, { withFileTypes: true })
      .filter((item) => item.isDirectory());

    const incumbency = folders
      .map((folder) => {
        const filePath = path.join(baseDir, folder.name, "data.json");
        if (!fs.existsSync(filePath)) return null;

        try {
          const content = fs.readFileSync(filePath, "utf-8");
          return JSON.parse(content);
        } catch (err) {
          console.error(`Error parsing ${filePath}:`, err);
          return null;
        }
      })
      .filter(Boolean);

    return NextResponse.json(incumbency);
  } catch (err) {
    console.error("Error reading incumbency:", err);
    return NextResponse.json(
      { error: "Failed to read incumbency" },
      { status: 500 }
    );
  }
}
