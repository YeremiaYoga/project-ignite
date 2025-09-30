// app/api/backgrounds/createBackgroundData/route.js
import { NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, 
  },
};

export async function POST(req) {
  const form = new formidable.IncomingForm();

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return resolve(
          NextResponse.json({ success: false, message: err.message }, { status: 500 })
        );
      }

      try {
        const name = fields.name;
        if (!name) {
          return resolve(
            NextResponse.json(
              { success: false, message: "Background name is required" },
              { status: 400 }
            )
          );
        }

        const folderName = name.toLowerCase().replace(/\s+/g, "_");
        const folderPath = path.join(process.cwd(), "public", "assets", "backgrounds", folderName);

  
        fs.mkdirSync(folderPath, { recursive: true });

   
        let imagePath = "";
        if (files.bg_image) {
          const oldPath = files.bg_image.filepath || files.bg_image.path;
          const ext = path.extname(files.bg_image.originalFilename);
          imagePath = `/assets/backgrounds/${folderName}/${folderName}_image${ext}`;
          const savePath = path.join(folderPath, `${folderName}_image${ext}`);

          fs.copyFileSync(oldPath, savePath);
        }


        const bgData = {
          ...fields,
          bg_image: imagePath,
        };

 
        const jsonFilePath = path.join(folderPath, "bgData.json");
        fs.writeFileSync(jsonFilePath, JSON.stringify(bgData, null, 2), "utf-8");

        resolve(
          NextResponse.json({
            success: true,
            message: "Background saved successfully",
            folder: folderName,
            file: "bgData.json",
            data: bgData,
          })
        );
      } catch (error) {
        resolve(
          NextResponse.json({ success: false, message: error.message }, { status: 500 })
        );
      }
    });
  });
}
