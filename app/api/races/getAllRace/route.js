import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const racesDir = path.join(process.cwd(), "data", "races");
    const folders = fs
      .readdirSync(racesDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    return NextResponse.json(folders, { status: 200 });
  } catch (error) {
    console.error("Failed to read races directory:", error);
    return NextResponse.json([], { status: 500 });
  }
}
