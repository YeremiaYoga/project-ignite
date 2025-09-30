import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const rawData = formData.get("data");
    const body = rawData ? JSON.parse(rawData) : {};

    const artFile = formData.get("art");
    const tokenFile = formData.get("token_art");

    const mainThemeFile = formData.get("main_theme_ogg");
    const combatThemeFile = formData.get("combat_theme_ogg");
    const template = {
      name: "",
      fullname: "",
      art: "",
      token_art: "",
      creator_name: "",
      creator_email: "",
      uuid: "",
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
      birth_country: "",
      gender: "",
      pronoun: "",
      height: { feet: "", inch: "", centimeter: "" },
      weight: { pounds: "", kilogram: "" },
      skin_colour: "",
      hair: "",
      wiki_visibility: false,

      backstory_visibiliy: false,
      backstory: "",
      voice_style: "",
      wayfarer: "",
      personality_traits: [],
      main_personality: "",
      detailed_personality: [],
      titles: [],
      fear_weakness_visibility: false,
      fear_weakness: [],
      motivation_visibility: false,
      motivation: [],
      previous_economical_standing: "",
      current_last_economical_standing: "",
      previous_social_classes: "",
      current_social_classes: "",

      appearance_visibility: false,
      appearance: "",
      main_theme: "",
      main_theme_ogg: "",
      combat_theme: "",
      combat_theme_ogg: "",
      nationality: "",
      main_resident: {
        resident: "",
        country: "",
      },
      notable_details: [],
      current_occupation: [],
      previous_occupation: [],
      other_resident: [],
      hobbies_visibility: false,
      hobbies: [],
      signature_object: [],
      signature_weapon: [],

      notable_accomplishments: [],
      connection_towards_events: [],
      notable_quotes: "",
      quotes_from_others: [],
      family: [],
      allies: [],
      friends: [],
      enemies: [],
      subordinates: [],
      affiliations: [],
      spesial_relationship: [],

      combat_value: 0,
      vision: "",
      disposition: "",
      damage_type: "",
      str: 0,
      dex: 0,
      con: 0,
      int: 0,
      wis: 0,
      cha: 0,
      size: {
        general: "",
        vtt_size: "",
      },
      creature_type: "",
      personality_combat_style: "",
      skill_prof: [],

      rotation_stamp: 0,
      stamp_type: 0,
      rotation_sticker: 0,
    };

    let mergedData = {
      ...template,
      ...body,
      height: { ...template.height, ...body.height },
      weight: { ...template.weight, ...body.weight },
    };

    mergedData.stamp_type = Math.floor(Math.random() * 40) + 1;
    mergedData.rotation_stamp = parseFloat(
      (Math.random() * 60 - 30).toFixed(1)
    );
    mergedData.rotation_sticker = parseFloat(
      (Math.random() * 60 - 30).toFixed(1)
    );

    const feet = parseFloat(mergedData.height.feet) || 0;
    const inch = parseFloat(mergedData.height.inch) || 0;
    const cm = parseFloat(mergedData.height.centimeter) || 0;

    if (feet || inch) {
      mergedData.height.centimeter = Math.round((feet * 12 + inch) * 2.54);
    } else if (cm) {
      const totalInches = cm / 2.54;
      mergedData.height.feet = Math.floor(totalInches / 12);
      mergedData.height.inch = Math.round(totalInches % 12);
    }

    // --- Konversi weight ---
    const pounds = parseFloat(mergedData.weight.pounds) || 0;
    const kg = parseFloat(mergedData.weight.kilogram) || 0;

    if (pounds) {
      mergedData.weight.kilogram = +(pounds * 0.453592).toFixed(1);
    } else if (kg) {
      mergedData.weight.pounds = +(kg / 0.453592).toFixed(1);
    }

    // --- Buat folder ---
    const characterName = mergedData.name?.trim() || "Unknown";
    const folderName = characterName.replace(/\s+/g, "_");

    const baseDir = path.join(process.cwd(), "data", "characters", folderName);
    await fs.mkdir(baseDir, { recursive: true });

    const publicDir = path.join(
      process.cwd(),
      "public",
      "assets",
      "characters",
      folderName
    );
    await fs.mkdir(publicDir, { recursive: true });

    // --- Simpan file art ---
    if (artFile && artFile instanceof File) {
      const buffer = Buffer.from(await artFile.arrayBuffer());
      const artPath = path.join(publicDir, `${folderName}_art.webp`);
      await fs.writeFile(artPath, buffer);
      mergedData.art = `/assets/characters/${folderName}/${folderName}_art.webp`;
    }

    // --- Simpan file token art ---
    if (tokenFile && tokenFile instanceof File) {
      const buffer = Buffer.from(await tokenFile.arrayBuffer());
      const tokenPath = path.join(publicDir, `${folderName}_token_art.webp`);
      await fs.writeFile(tokenPath, buffer);
      mergedData.token_art = `/assets/characters/${folderName}/${folderName}_token_art.webp`;
    }

    // --- Simpan main_theme_ogg ---
    if (mainThemeFile && mainThemeFile instanceof File) {
      const buffer = Buffer.from(await mainThemeFile.arrayBuffer());
      const mainThemePath = path.join(
        publicDir,
        `${folderName}_main_theme.ogg`
      );
      await fs.writeFile(mainThemePath, buffer);
      mergedData.main_theme_ogg = `/assets/characters/${folderName}/${folderName}_main_theme.ogg`;
    }

    // --- Simpan combat_theme_ogg ---
    if (combatThemeFile && combatThemeFile instanceof File) {
      const buffer = Buffer.from(await combatThemeFile.arrayBuffer());
      const combatThemePath = path.join(
        publicDir,
        `${folderName}_combat_theme.ogg`
      );
      await fs.writeFile(combatThemePath, buffer);
      mergedData.combat_theme_ogg = `/assets/characters/${folderName}/${folderName}_combat_theme.ogg`;
    }

    // --- Simpan JSON ---
    const safeName = characterName.trim().replace(/\s+/g, "_");
    const filePath = path.join(baseDir, `${safeName}Data.json`);
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
