import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();

    const template = {
      name: "",
      fullname: "",
      art: "",
      token_art: "",
      creator_name: "",
      creator_email: "",
      randomid: "",
      race: "",
      subrace: "",
      background: "",
      character_type: "",
      allignment: "",
      status: "",
      birth_year: "",
      birth_year_type: "",
      death_year: "",
      death_year_type: "",
      birth_place: "",
      gender: "",
      pronoun: "",
      height: { feet: 0, inch: 0, centimeter: 0 },
      weight: { pounds: 0, kilogram: 0 },
      skin_colour: "",
      hair: "",
      wiki_visibility: true,
      //   backstory: "",
      //   voice_style: "",
      //   wayfarer: [],
      //   personality_traits: [],
      //   main_personality: "",
      //   detailed_personality: [],
      //   titles: [],
      //   fear_weakness_visibility: true,
      //   fear_weakness: [],
      //   motivation_visibility: true,
      //   motivation: [],
      //   previous_economical_standing: "",
      //   current_last_economical_standing: "",
      //   social_classes: "",
    };

    let mergedData = {
      ...template,
      ...body,
      height: { ...template.height, ...body.height },
      weight: { ...template.weight, ...body.weight },
    };

    let feet = parseFloat(mergedData.height.feet) || 0;
    let inch = parseFloat(mergedData.height.inch) || 0;
    let cm = parseFloat(mergedData.height.centimeter) || 0;

    if (feet || inch) {
      cm = Math.round((feet * 12 + inch) * 2.54);
    } else if (cm) {
      const totalInches = cm / 2.54;
      feet = Math.floor(totalInches / 12);
      inch = Math.round(totalInches % 12);
    }

    mergedData.height = {
      feet: feet,
      inch: inch,
      centimeter: cm,
    };

    let pounds = parseFloat(mergedData.weight.pounds) || 0;
    let kg = parseFloat(mergedData.weight.kilogram) || 0;

    if (pounds) {
      kg = +(pounds * 0.453592).toFixed(1);
    } else if (kg) {
      pounds = +(kg / 0.453592).toFixed(1);
    }

    mergedData.weight = {
      pounds: pounds,
      kilogram: kg,
    };

    const characterName = mergedData.name?.trim() || "Unknown";
    const folderName = characterName.replace(/\s+/g, "_");
    const baseDir = path.join(process.cwd(), "data", "characters", folderName);
    await fs.mkdir(baseDir, { recursive: true });

    const filePath = path.join(baseDir, `${characterName}Data.json`);
    await fs.writeFile(filePath, JSON.stringify(mergedData, null, 2), "utf-8");

    return new Response(JSON.stringify({ success: true, path: filePath }), {
      status: 200,
    });
  } catch (err) {
    console.error("Save error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
