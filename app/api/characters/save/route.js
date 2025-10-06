import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

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
      main_resident: { resident: "", country: "" },
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
      size: { general: "", vtt_size: "" },
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
    mergedData.rotation_stamp = parseFloat((Math.random() * 60 - 30).toFixed(1));
    mergedData.rotation_sticker = parseFloat((Math.random() * 60 - 30).toFixed(1));

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

    const pounds = parseFloat(mergedData.weight.pounds) || 0;
    const kg = parseFloat(mergedData.weight.kilogram) || 0;
    if (pounds) {
      mergedData.weight.kilogram = +(pounds * 0.453592).toFixed(1);
    } else if (kg) {
      mergedData.weight.pounds = +(kg / 0.453592).toFixed(1);
    }

    const uuid = mergedData.uuid || "unknown_uuid";
    const dataDir = path.join(process.cwd(), "data", "characters", uuid);
    await fs.mkdir(dataDir, { recursive: true });

    const publicDir = path.join(process.cwd(), "public", "assets", "characters", uuid);
    await fs.mkdir(publicDir, { recursive: true });

    async function saveFixed(file, fixedName) {
      const abs = path.join(publicDir, fixedName);
      try { await fs.unlink(abs); } catch {} 
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(abs, buffer);
      return `/assets/characters/${uuid}/${fixedName}`;
    }

    if (artFile && artFile instanceof File) {
      mergedData.art = await saveFixed(artFile, "art_image.webp");
    }
    if (tokenFile && tokenFile instanceof File) {
      mergedData.token_art = await saveFixed(tokenFile, "token_image.webp");
    }
    if (mainThemeFile && mainThemeFile instanceof File) {
      mergedData.main_theme_ogg = await saveFixed(mainThemeFile, "main_theme.ogg");
    }
    if (combatThemeFile && combatThemeFile instanceof File) {
      mergedData.combat_theme_ogg = await saveFixed(combatThemeFile, "combat_theme.ogg");
    }

    const jsonPath = path.join(dataDir, `${uuid}Data.json`);
    await fs.writeFile(jsonPath, JSON.stringify(mergedData, null, 2), "utf-8");

    return new Response(JSON.stringify({ success: true, data: mergedData }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Save error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
