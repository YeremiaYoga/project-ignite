import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function getFilePath(file) {
  return path.join(process.cwd(), "data", "hyperlink", `${file}.json`);
}

// GET → ambil data
export async function GET(req, { params }) {
  const { file } = params;

  try {
    const filePath = getFilePath(file);
    const content = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(content);
    return NextResponse.json(json);
  } catch {
    return NextResponse.json({ error: "File tidak ditemukan" }, { status: 404 });
  }
}

// POST → tambah data
export async function POST(req, { params }) {
  const { file } = params;
  const { key, value } = await req.json();

  const filePath = getFilePath(file);
  let json = {};

  if (fs.existsSync(filePath)) {
    json = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  json[key] = value;
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2));

  return NextResponse.json(json);
}

// PUT → edit data
export async function PUT(req, { params }) {
  const { file } = params;
  const { oldKey, newKey, value } = await req.json();

  const filePath = getFilePath(file);
  const json = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  if (oldKey !== newKey) {
    delete json[oldKey];
  }
  json[newKey] = value;

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
  return NextResponse.json(json);
}

// DELETE → hapus data
export async function DELETE(req, { params }) {
  const { file } = params;
  const { key } = await req.json();

  const filePath = getFilePath(file);
  const json = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  delete json[key];

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
  return NextResponse.json(json);
}
