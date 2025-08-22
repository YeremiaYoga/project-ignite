// /app/api/backgrounds/createBackgroundsData/route.js
import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.name) {
      return NextResponse.json(
        { success: false, message: "Background name is required" },
        { status: 400 }
      );
    }

    // nama folder pakai lowercase dan tanpa spasi
    const folderName = body.name.toLowerCase().replace(/\s+/g, "_");

    const folderPath = path.join(process.cwd(), "data", "backgrounds", folderName);
    const filePath = path.join(folderPath, "bgData.json");

    // buat folder kalau belum ada
    await mkdir(folderPath, { recursive: true });

    // tulis file JSON
    await writeFile(filePath, JSON.stringify(body, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Background saved successfully",
      folder: folderName,
      file: "bgData.json",
      data: body,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
