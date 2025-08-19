// app/api/races/saveRaceDetail/route.js
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(request) {
  try {
    const incomingData = await request.json();

    const raceName = incomingData.name; // Contoh: "Dragonborn"

    if (!raceName) {
      return NextResponse.json(
        { message: "Race name is required." },
        { status: 400 }
      );
    }

    const folderName = raceName.toLowerCase();
    const raceDir = path.join(process.cwd(), "data", "races", folderName);

    // Buat folder jika belum ada
    await fs.mkdir(raceDir, { recursive: true });

    const fileName = `${raceName}Detail.json`;
    const filePath = path.join(raceDir, fileName);

    const formattedRaceNameForImage = raceName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");

    const imageUrl = `https://heraldenterimentmedia.my.id/Race/${formattedRaceNameForImage}/${formattedRaceNameForImage}-Main.webp`;

    const dataToSave = {
      name: incomingData.name,
      creature_type: incomingData.creature_type || "",
      size: incomingData.size || "",
      speed: incomingData.speed || "",
      asi: incomingData.asi || "",
      source: incomingData.source || "",
      age: incomingData.age || "",
      languages: incomingData.languages || "",
      image: imageUrl,
      details: incomingData.details || "",
      features: incomingData.features || [],
    };

    dataToSave.features = dataToSave.features
      .map((feature) => ({
        title: feature.title || "",
        description: feature.description || undefined,
        table: feature.table || undefined,
        list: feature.list || undefined,
      }))
      .filter(
        (feature) =>
          feature.title || feature.description || feature.table || feature.list
      );

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
