// app/api/races/saveRaceDetail/route.js
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const raceName = formData.get("name");
    if (!raceName) {
      return NextResponse.json(
        { message: "Race name is required." },
        { status: 400 }
      );
    }

    const folderName = raceName
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/-/g, "_");
    const formattedRaceNameForImage = raceName.replace(/[\s-]+/g, "_");

    const raceDir = path.join(process.cwd(), "data", "races", folderName);
    await fs.mkdir(raceDir, { recursive: true });

    const raceImageDir = path.join(
      process.cwd(),
      "public",
      "assets",
      "races",
      folderName
    );
    await fs.mkdir(raceImageDir, { recursive: true });

    let imageUrl = "";
    const uploadedFile = formData.get("image");

    if (uploadedFile instanceof File) {
      const ext = path.extname(uploadedFile.name) || ".webp";
      const imageFileName = `${formattedRaceNameForImage}_main${ext}`;
      const imagePath = path.join(raceImageDir, imageFileName);

      const buffer = Buffer.from(await uploadedFile.arrayBuffer());
      await fs.writeFile(imagePath, buffer);

      imageUrl = `/assets/races/${folderName}/${imageFileName}`;
    }

    let traits = [];
    try {
      const rawTraits = formData.get("traits") || "[]";
      console.log(rawTraits);
      traits = JSON.parse(rawTraits);
      console.log(traits);
    } catch {
      traits = [];
    }

    traits = traits
      .map((trait) => ({
        title: trait.title || "",
        description: trait.description || undefined,
        table: trait.table || undefined,
        list: trait.list || undefined,
      }))
      .filter(
        (trait) => trait.title || trait.description || trait.table || trait.list
      );

    const dataToSave = {
      name: raceName
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      creature_type: formData.get("creature_type") || "",
      size: formData.get("size") || "",
      speed: formData.get("speed") || "",
      asi: formData.get("asi") || "",
      source: formData.get("source") || "",
      age: formData.get("age") || "",
      languages: formData.get("languages") || "",
      image: imageUrl,
      details: formData.get("details") || "",
      tales_details: formData.get("tales_details") || "",
      features: traits,
    };

    const fileName = `${folderName}Detail.json`;
    const filePath = path.join(raceDir, fileName);

    await fs.writeFile(filePath, JSON.stringify(dataToSave, null, 2), "utf-8");

    return NextResponse.json(
      { message: `Race detail for ${raceName} saved successfully!` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving race detail:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
