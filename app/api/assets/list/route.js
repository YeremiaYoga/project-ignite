// app/api/assets/list/route.js
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Pakai Node.js runtime
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"]);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const rel = searchParams.get("path") || ""; // contoh: "" atau "icons/magic"
    const baseDir = path.join(process.cwd(), "public", "assets");

    // Sanitasi path agar tetap di dalam /public/assets
    const safeRel = path.normalize(rel).replace(/^(\.\.(\/|\\|$))+/, "");
    const target = path.join(baseDir, safeRel);

    // Pastikan target tetap di bawah baseDir
    if (!target.startsWith(baseDir)) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    if (!fs.existsSync(target)) {
      return NextResponse.json({ path: safeRel, folders: [], files: [], breadcrumbs: [] });
    }

    const items = fs.readdirSync(target, { withFileTypes: true });

    const folders = items
      .filter((d) => d.isDirectory())
      .map((d) => ({
        name: d.name,
        path: path.posix.join(safeRel.replaceAll("\\", "/"), d.name),
      }));

    const files = items
      .filter((d) => d.isFile())
      .map((d) => d.name)
      .filter((name) => IMAGE_EXT.has(path.extname(name).toLowerCase()))
      .map((name) => {
        const relPath = path.posix.join(safeRel.replaceAll("\\", "/"), name);
        return {
          name,
          path: relPath,
          url: `/assets/${relPath}`, // bisa dipakai langsung di img src
        };
      });

    // Breadcrumbs
    const parts = safeRel.split(/[\\/]/).filter(Boolean);
    const breadcrumbs = [{ name: "assets", path: "" }];
    parts.reduce((acc, cur) => {
      const p = acc ? `${acc}/${cur}` : cur;
      breadcrumbs.push({ name: cur, path: p });
      return p;
    }, "");

    return NextResponse.json({ path: safeRel, folders, files, breadcrumbs });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to list assets" }, { status: 500 });
  }
}
