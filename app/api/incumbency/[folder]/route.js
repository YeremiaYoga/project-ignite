// app/api/incumbency/[folder]/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import fs from "fs";
import path from "path";

export async function GET(_req, { params }) {
  try {
    // folder bisa ber-spasi / encoded -> decode dulu
    const folder = decodeURIComponent(params.folder || "").trim();
    if (!folder) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    const baseDir = path.join(process.cwd(), "data", "incumbency", folder);

    if (!fs.existsSync(baseDir)) {
      // folder tidak ada → kosongkan saja (bukan 404, biar aman di client)
      return new Response(JSON.stringify([]), { status: 200 });
    }

    // ambil semua file JSON di folder, urutkan by nomor versi jika ada (data_vX.json)
    const files = fs
      .readdirSync(baseDir)
      .filter((f) => f.toLowerCase().endsWith(".json"))
      .sort((a, b) => {
        const va = Number((a.match(/v(\d+)/i) || [])[1] || 0);
        const vb = Number((b.match(/v(\d+)/i) || [])[1] || 0);
        return va - vb;
      });

    const result = files.map((filename) => {
      try {
        const fullPath = path.join(baseDir, filename);
        const content = JSON.parse(fs.readFileSync(fullPath, "utf-8"));

        // coba tebak version dari nama file; fallback ke content.version; default 1
        const m = filename.match(/v(\d+)/i);
        const version = m ? Number(m[1]) : (typeof content.version === "number" ? content.version : 1);

        return {
          folder,
          filename,
          version,
          ...content,
        };
      } catch (e) {
        return {
          folder,
          filename,
          error: `Error parsing ${filename}: ${e.message}`,
        };
      }
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET /api/incumbency/[folder] error:", err);
    return new Response(JSON.stringify([]), { status: 500 });
  }
}
