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
        const folderPath = path.join(baseDir, folder.name);

        const versionFiles = fs
          .readdirSync(folderPath, { withFileTypes: true })
          .filter((f) => f.isFile())
          .map((f) => f.name)
          .filter((name) => /^data_v\d+\.json$/.test(name));

        let targetFilePath;

        if (versionFiles.length > 0) {
          const latest = versionFiles
            .map((name) => ({
              name,
              v: parseInt(name.match(/^data_v(\d+)\.json$/)[1], 10),
            }))
            .sort((a, b) => b.v - a.v)[0];

          targetFilePath = path.join(folderPath, latest.name);
        } else {
          const legacy = path.join(folderPath, "data.json");
          if (fs.existsSync(legacy)) targetFilePath = legacy;
        }

        if (!targetFilePath) return null;

        try {
          const content = fs.readFileSync(targetFilePath, "utf-8");
          return JSON.parse(content);
        } catch (err) {
          console.error(`Error parsing ${targetFilePath}:`, err);
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
