// app/api/incumbency/save/route.js
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export const runtime = "nodejs";

const ROOT = process.cwd();

function slugify(input) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") 
    .replace(/\s+/g, "_")    
    .replace(/_+/g, "_");     
}

export async function POST(req) {
  try {
    const data = await req.json();

    const name = data?.name?.toString().trim();
    const version = Number(data?.version) || 1;

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Field 'name' wajib diisi." },
        { status: 400 }
      );
    }

    const slug = slugify(name);
    const dir = path.join(ROOT, "data", "incumbency", slug);
    await fs.mkdir(dir, { recursive: true });

    const filename = `data_v${version}.json`;
    const filePath = path.join(dir, filename);

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      path: `data/incumbency/${slug}/${filename}`,
    });
  } catch (err) {
    console.error("Save incumbency error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal error" },
      { status: 500 }
    );
  }
}
