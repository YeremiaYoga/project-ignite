import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const cleanString = (str) => {
      if (typeof str !== "string") return str;

      return str.replace(/^[_\s]+|[_\s]+$/g, "");
    };
    const formData = await req.formData();

    const raceName = formData.get("raceName");
    const handbook = formData.get("handbook");
    const description = formData.get("description");
    const traits =
      formData
        .get("traits")
        ?.split(",")
        .map((t) => t.trim())
        .filter(Boolean) || [];
    const file = formData.get("image");

    if (!raceName) {
      return new Response("Missing raceName", { status: 400 });
    }

    const raceNameLower = raceName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/-/g, "_");
    const raceNameSafe = raceName.replace(/\s+/g, "_").replace(/-/g, "_");

    const dataDir = path.join(process.cwd(), "data", "races", raceNameLower);
    const imageDir = path.join(
      process.cwd(),
      "public",
      "assets",
      "races",
      raceNameLower
    );

    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });

    const imageExt = file?.name?.split(".").pop() || "webp";
    const imageFileName = `${raceNameLower}.${imageExt}`;
    const imagePath = path.join(imageDir, imageFileName);

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(imagePath, buffer);
    }

    const imageUrl = `/assets/races/${raceNameLower}/${imageFileName}`;

    const filePath = path.join(dataDir, `${raceNameLower}Data.json`);
    const data = {
      name: cleanString(raceName),
      source: cleanString(handbook),
      description,
      traits,
      image: imageUrl,
    };

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return new Response(
      JSON.stringify({ message: "Race saved successfully." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response("Server error", { status: 500 });
  }
}
