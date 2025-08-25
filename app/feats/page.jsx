import fs from "fs";
import path from "path";
import FeatsClient from "./FeatsClient";

export default function FeatsPage() {
  const dir = path.join(process.cwd(), "data/feats");

  const folders = fs.readdirSync(dir);

  const feats = folders.map((folder) => {
    const filePath = path.join(dir, folder, "featData.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  });

  return <FeatsClient feats={feats} />;
}
