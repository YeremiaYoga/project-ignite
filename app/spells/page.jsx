import fs from "fs";
import path from "path";
import ClientSpellsPage from "./ClientSpellsPage";

export default function SpellsPage() {
  const spellsDirectory = path.join(process.cwd(), "data", "spells");
  const fileNames = fs.readdirSync(spellsDirectory);
  const spells = fileNames.map((fileName) => {
    const filePath = path.join(spellsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(fileContents);
    return json[0];
  });

  return <ClientSpellsPage spells={spells} />;
}
