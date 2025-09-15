// app/api/spellbuilder/route.js
import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let data = {};
    let imageFile = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          if (key === "image") imageFile = value;
        } else {
          try {
            data[key] = JSON.parse(value);
          } catch {
            data[key] = value;
          }
        }
      }
    }
    else {
      data = await req.json();
    }

    const level = Math.min(Math.max(parseInt(data.level || 0), 0), 9);
    const normalizeArray = (val) =>
      Array.isArray(val) ? [...new Set(val)] : val ? [val] : [];

    data.optional_classes = normalizeArray(data.optional_classes);
    data.subclasses = normalizeArray(data.subclasses);
    data.species = normalizeArray(data.species);
    data.feats = normalizeArray(data.feats);
    data.other_options_features = normalizeArray(data.other_options_features);

    if (["Self", "Touch"].includes(data.range_exp)) {
      data.distance = "";
    } else if (data.distance) {
      data.distance = parseInt(data.distance, 10) || "";
    }

    let imagePath = "";
    if (imageFile) {
      const safeName = data.name.trim().replace(/\s+/g, "_").toLowerCase();
      const imgDir = path.join(process.cwd(), "public/assets/spells", safeName);
      await fs.mkdir(imgDir, { recursive: true });

      const ext = path.extname(imageFile.name) || ".webp";
      const imgFileName = `${safeName}_img${ext}`;
      const imgFullPath = path.join(imgDir, imgFileName);

      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await fs.writeFile(imgFullPath, buffer);

      imagePath = `/assets/spells/${safeName}/${imgFileName}`;
    }

    const spell = {
      name: data.name || "",
      level,
      short_source: data.short_source || "",
      source: data.source || "",
      school: data.school || "",
      casting_time: data.casting_time || "",
      distance: data.distance || "",
      range: data.range || "",
      area: data.area || "",
      components: data.components,
      duration: data.duration || "",
      concentration: Boolean(data.concentration),
      ritual: Boolean(data.ritual),
      damage_type: data.damage_type,
      damage_dice: data.damage_dice || "",
      damage_level: data.damage_level || "",
      saving_throw: data.saving_throw,
      material: data.material || "",
      classes: normalizeArray(data.classes),
      optional_classes: data.optional_classes,
      subclasses: data.subclasses,
      species: data.species,
      feats: data.feats,
      other_options_features: data.other_options_features,
      description: data.description || "",
      higher_level: data.higher_level || "",
      range_exp: data.range_exp || "",
      backgrounds: data.backgrounds || "",
      image: imagePath,
    };

    const safeFileName = data.name.replace(/\s+/g, "_").toLowerCase();
    const dir = path.join(
      process.cwd(),
      "data/spells",
      level === 0 ? "cantrips" : String(level)
    );
    await fs.mkdir(dir, { recursive: true });

    const filePath = path.join(dir, `${safeFileName}.json`);
    await fs.writeFile(filePath, JSON.stringify(spell, null, 2));

    return NextResponse.json({ success: true, spell });
  } catch (err) {
    console.error("Error saving spell:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
