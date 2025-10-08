
import { NextResponse } from "next/server";
import fs from "fs";
import fsp from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function GET() {
  try {
    const baseDir = path.join(process.cwd(), "data", "incumbency");
    if (!fs.existsSync(baseDir)) {
      return NextResponse.json([]);
    }

    const folders = fs
      .readdirSync(baseDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    const all = [];

    for (const folder of folders) {
      const dir = path.join(baseDir, folder);
      const files = fs
        .readdirSync(dir, { withFileTypes: true })
        .filter((f) => f.isFile())
        .map((f) => f.name);

      const versionFiles = files.filter((name) => /^data_v\d+\.json$/.test(name));
      for (const vf of versionFiles) {
        const p = path.join(dir, vf);
        try {
          const raw = await fsp.readFile(p, "utf-8");
          const json = JSON.parse(raw);

          const m = vf.match(/^data_v(\d+)\.json$/);
          const vFromFile = m ? Number(m[1]) : undefined;
          const merged = {
            ...json,
            version: json?.version ?? vFromFile ?? 1,
            __path: `data/incumbency/${folder}/${vf}`,
            __slug: folder,
          };
          all.push(merged);
        } catch (err) {
          console.error(`Error parsing ${p}:`, err);
        }
      }


      if (files.includes("data.json")) {
        const legacyPath = path.join(dir, "data.json");
        try {
          const raw = await fsp.readFile(legacyPath, "utf-8");
          const json = JSON.parse(raw);
          const merged = {
            ...json,
            version: json?.version ?? 1,
            __path: `data/incumbency/${folder}/data.json`,
            __slug: folder,
          };
          all.push(merged);
        } catch (err) {
          console.error(`Error parsing ${legacyPath}:`, err);
        }
      }
    }


    all.sort((a, b) => {
      const na = (a.name || "").localeCompare(b.name || "");
      if (na !== 0) return na;
      return (b.version ?? 0) - (a.version ?? 0);
    });

    return NextResponse.json(all);
  } catch (err) {
    console.error("getAllDataAllVersion error:", err);
    return NextResponse.json({ error: "Failed to read incumbency" }, { status: 500 });
  }
}
