import fs from "fs";
import path from "path";
import ClientSpellsPage from "./ClientSpellsPage";

export default function SpellsPage() {
  const baseDirectory = path.join(process.cwd(), "data", "spells");

  const levelFolders = fs.readdirSync(baseDirectory).filter((name) => {
    const fullPath = path.join(baseDirectory, name);
    return fs.statSync(fullPath).isDirectory() && 
           (name === "cantrips" || /^[1-9]$/.test(name));
  });

  const spells = [];


  for (const folder of levelFolders) {
    const folderPath = path.join(baseDirectory, folder);
    const fileNames = fs.readdirSync(folderPath);

    for (const fileName of fileNames) {
      const filePath = path.join(folderPath, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const json = JSON.parse(fileContents);
      spells.push(json[0]); 
    }
  }

  return <ClientSpellsPage spells={spells} />;
}
