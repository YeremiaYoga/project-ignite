import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(request) {
  try {
    const { name, parent_race_name } = await request.json();

    if (!name || !parent_race_name) {
      return NextResponse.json(
        { message: "Subrace name and parent race name are required." },
        { status: 400 }
      );
    }
    const raceFolder = parent_race_name.toLowerCase();
    const subraceDirPath = path.join(
      process.cwd(),
      "data",
      "races",
      raceFolder,
      "subrace"
    );
    const fileName = `${name}.json`;
    const filePath = path.join(subraceDirPath, fileName);
    const dataToSave = {
      name: name,
    };

    await fs.mkdir(subraceDirPath, { recursive: true });

    await fs.writeFile(filePath, JSON.stringify(dataToSave, null, 2), "utf-8");

    return NextResponse.json(
      {
        message: `Subrace '${name}' saved successfully in '${raceFolder}/subrace' folder!`,
        filePath: filePath,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/races/saveSubrace:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
