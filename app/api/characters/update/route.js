import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const id = formData.get("id");
    if (!id) {
      return NextResponse.json({
        success: false,
        error: "Missing character id",
      });
    }

    // Menggunakan ID karakter untuk nama folder, tapi TIDAK untuk nama file
    const jsonData = JSON.parse(formData.get("data") || "{}");

    // 1. Folder file (public)
    const assetsDir = path.join(
      process.cwd(),
      "public",
      "assets",
      "characters",
      id
    );
    fs.mkdirSync(assetsDir, { recursive: true });

    // 2. Folder data JSON (server only)
    const dataDir = path.join(process.cwd(), "data", "characters", id);
    fs.mkdirSync(dataDir, { recursive: true });

    const fileFields = [
      { field: "art", filename: "art_image" },
      { field: "token_art", filename: "token_image" },
      { field: "main_theme_ogg", filename: "main_theme" },
      { field: "combat_theme_ogg", filename: "combat_theme" },
    ];

    for (const { field, filename: baseFilename } of fileFields) {
      const file = formData.get(field);
      if (file && typeof file === "object" && file.arrayBuffer) {
        const ext = path.extname(file.name).toLowerCase();

        const filenameWithExt = `${baseFilename}${ext}`;
        const assetPath = path.join(assetsDir, filenameWithExt);

        const oldFilePattern = `${baseFilename}.*`;
        fs.readdirSync(assetsDir).forEach((fileInDir) => {
          if (fileInDir.startsWith(baseFilename)) {
            try {
              fs.unlinkSync(path.join(assetsDir, fileInDir));
            } catch {}
          }
        });

        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(assetPath, buffer);

        jsonData[field] = `/assets/characters/${id}/${filenameWithExt}`;
      }
    }

    const jsonPath = path.join(dataDir, `${id}Data.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2), "utf-8");

    return NextResponse.json({ success: true, data: jsonData });
  } catch (err) {
    console.error("Error updating character:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
