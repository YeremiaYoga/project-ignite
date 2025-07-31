// app/api/spellbuilder/route.js
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request) {
  const body = await request.json();

  const name = body.name?.trim();
  if (!name) {
    return new Response("Nama spell kosong", { status: 400 });
  }

  const filename = `${name.replace(/\s+/g, "_")}.json`;
  const dirPath = path.join(process.cwd(), "data", "test");

  try {
    await mkdir(dirPath, { recursive: true });
    await writeFile(
      path.join(dirPath, filename),
      JSON.stringify([body], null, 2)
    );
    return new Response("Berhasil", { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Gagal membuat file", { status: 500 });
  }
}
