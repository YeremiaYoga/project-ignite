import fs from "fs";
import path from "path";
import BackgroundsClient from "./BackgroundsClient";

export default function BackgroundsPage() {
  const dir = path.join(process.cwd(), "data/backgrounds");

  const folders = fs.readdirSync(dir);

  const backgrounds = folders.map((folder) => {
    const filePath = path.join(dir, folder, "bgData.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  });

  return <BackgroundsClient backgrounds={backgrounds} />;
}
