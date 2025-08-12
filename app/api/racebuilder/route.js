import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();
    const { raceName, handbook, description, traits } = body;

    if (!raceName) {
      return new Response("Missing raceName", { status: 400 });
    }

    const raceNameLower = raceName.toLowerCase();

    const image = `https://heraldenterimentmedia.my.id/Race/${raceName}/${raceName}.webp`;

    const dirPath = path.join(process.cwd(), "data", "races", raceNameLower);
    const filePath = path.join(dirPath, `${raceNameLower}Data.json`);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const data = {
      name: raceName,
      source: handbook,
      description,
      traits,
      image,
    };

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return new Response(
      JSON.stringify({ message: "Race saved successfully." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response("Server error", { status: 500 });
  }
}
