import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable-serverless";
import fs from "fs/promises";
import path from "path";
import {
  ensureDirectoryExists,
  sanitizeFileName,
  serverPath,
} from "../../utils/helper";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, as we'll handle it manually
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const uploadDir = path.join(process.cwd(), "public/uploads");
    // const uploadDir = serverPath("public/uploads");

    // Ensure that the target directory exists
    await ensureDirectoryExists(uploadDir);

    const form = new formidable.IncomingForm();
    form.uploadDir = uploadDir;

    form.parse(req, async (err: any, fields: any, files: { image: any }) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const { image } = files;

      if (!image) {
        return res.status(400).json({ error: "Image file not provided" });
      }
      const sanitizedFileName = sanitizeFileName(image.name);
      const fileExtension = getFileExtension(sanitizedFileName);
      const uniqueFileName = `${uuidv4()}.${fileExtension}`;

      const oldPath = image.path as string; // Assert the type of image.path to string
      const newPath = path.join(uploadDir, uniqueFileName);

      await fs.rename(oldPath, newPath);

      res.status(200).json({ uniqueFileName });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function getFileExtension(filename: string) {
  // Use a regular expression to match the file extension
  const match = /\.([0-9a-z]+)$/i.exec(filename);

  // If a match is found, return the matched extension (group 1)
  return match ? match[1] : null;
}
