
import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.name) {
      return NextResponse.json(
        { success: false, message: "Feats name is required" },
        { status: 400 }
      );
    }

   
    const folderName = body.name.toLowerCase().replace(/\s+/g, "_");

    const folderPath = path.join(process.cwd(), "data", "feats", folderName);
    const filePath = path.join(folderPath, "featData.json");
    await mkdir(folderPath, { recursive: true });
    await writeFile(filePath, JSON.stringify(body, null, 2), "utf-8");
    return NextResponse.json({
      success: true,
      message: "Feats saved successfully",
      folder: folderName,
      file: "featData.json",
      data: body,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
