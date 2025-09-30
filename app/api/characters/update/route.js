import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const id = formData.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing character id" });
    }

    const jsonData = JSON.parse(formData.get("data") || "{}");

    const baseDir = path.join(process.cwd(), "data", "characters", id);

    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }


    const fileFields = ["art", "token_art", "main_theme_ogg", "combat_theme_ogg"];
    for (const field of fileFields) {
      const file = formData.get(field);
      if (file && typeof file === "object" && file.arrayBuffer) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filePath = path.join(baseDir, file.name);
        fs.writeFileSync(filePath, buffer);
        jsonData[field] = `/data/characters/${id}/${file.name}`; 
      }
    }

    const filePath = path.join(baseDir, `${id}Data.json`);
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");

    return NextResponse.json({ success: true, data: jsonData });
  } catch (err) {
    console.error("Error updating character:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
