import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const raceName = searchParams.get("raceName");

    if (!raceName) {
      return NextResponse.json(
        { message: "Parent race name is required." },
        { status: 400 }
      );
    }

    const raceFolder = raceName.toLowerCase();
    const subraceDirPath = path.join(
      process.cwd(),
      "data",
      "races",
      raceFolder,
      "subrace"
    );

    try {
      await fs.access(subraceDirPath);
    } catch {
      return NextResponse.json(
        { message: `No subrace folder found for '${raceName}'.`, subraces: [] },
        { status: 200 }
      );
    }

    const files = await fs.readdir(subraceDirPath);
    const subraces = [];

    for (const file of files) {
      if (file.endsWith(".json")) {
        const filePath = path.join(subraceDirPath, file);
        const content = await fs.readFile(filePath, "utf-8");
        subraces.push(JSON.parse(content));
      }
    }

    return NextResponse.json(
      { message: "Subraces fetched successfully.", subraces },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/races/getSubraces:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
