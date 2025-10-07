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

    const incoming = JSON.parse(formData.get("data") || "{}");

    const assetsDir = path.join(
      process.cwd(),
      "public",
      "assets",
      "characters",
      id
    );
    fs.mkdirSync(assetsDir, { recursive: true });
    const dataDir = path.join(process.cwd(), "data", "characters", id);
    fs.mkdirSync(dataDir, { recursive: true });

    const jsonPath = path.join(dataDir, `${id}Data.json`);
    let oldData = {};
    if (fs.existsSync(jsonPath)) {
      try {
        oldData = JSON.parse(fs.readFileSync(jsonPath, "utf-8") || "{}");
      } catch {
        oldData = {};
      }
    }

    const merged = { ...oldData, ...incoming };

    const fileFields = [
      { field: "art", filename: "art_image" },
      { field: "token_art", filename: "token_image" },
      { field: "main_theme_ogg", filename: "main_theme" },
      { field: "combat_theme_ogg", filename: "combat_theme" },
    ];

    for (const { field, filename: aliasKey } of fileFields) {
      const upload = formData.get(field);

      if (upload && typeof upload === "object" && upload.arrayBuffer) {
        const ext = path.extname(upload.name || "").toLowerCase() || ".bin";
        const fileBase = aliasKey;
        const filenameWithExt = `${fileBase}${ext}`;
        const assetPath = path.join(assetsDir, filenameWithExt);

        for (const f of fs.readdirSync(assetsDir)) {
          if (f.startsWith(fileBase)) {
            try {
              fs.unlinkSync(path.join(assetsDir, f));
            } catch {}
          }
        }

        const buffer = Buffer.from(await upload.arrayBuffer());
        fs.writeFileSync(assetPath, buffer);

        const publicPath = `/assets/characters/${id}/${filenameWithExt}`;

        merged[field] = publicPath;
        merged[aliasKey] = publicPath;
      } else {
        const oldPath =
          merged[field] ??
          merged[aliasKey] ??
          oldData[field] ??
          oldData[aliasKey];

        if (oldPath) {
          merged[field] = oldPath;
          merged[aliasKey] = oldPath;
        }
      }
    }

    fs.writeFileSync(jsonPath, JSON.stringify(merged, null, 2), "utf-8");

    return NextResponse.json({ success: true, data: merged });
  } catch (err) {
    console.error("Error updating character:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
