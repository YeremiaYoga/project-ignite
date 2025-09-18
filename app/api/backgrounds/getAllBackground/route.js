import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const backgroundsDir = path.join(process.cwd(), "data", "backgrounds");
    const folders = fs
      .readdirSync(backgroundsDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    return NextResponse.json(folders, { status: 200 });
  } catch (error) {
    console.error("Failed to read backgrounds directory:", error);
    return NextResponse.json([], { status: 500 });
  }
}
