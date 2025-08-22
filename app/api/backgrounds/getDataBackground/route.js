// app/api/background/getDataBackground/route.js
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    let backgroundName = searchParams.get("name");

    if (!backgroundName) {
      return NextResponse.json(
        { error: "Missing background name" },
        { status: 400 }
      );
    }

    // pastikan lowercase
    backgroundName = backgroundName.toLowerCase();

    const filePath = path.join(
      process.cwd(),
      "data",
      "backgrounds",
      backgroundName,
      "bgdata.json" // juga pastikan nama file kecil semua
    );

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `Background '${backgroundName}' not found.` },
        { status: 404 }
      );
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileContent);

    return NextResponse.json(jsonData, { status: 200 });
  } catch (err) {
    console.error("Error in getDataBackground API:", err);
    return NextResponse.json(
      { error: "Failed to load background data." },
      { status: 500 }
    );
  }
}
