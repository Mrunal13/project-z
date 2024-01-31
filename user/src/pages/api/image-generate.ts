// pages/api/image-generate.ts
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import {
  ensureDirectoryExists,
  sanitizeFileName,
  serverPath,
} from "../../utils/helper";

const openaiApiEndPoint = process.env.OPENAI_API_ENDPOINT;
const openaiApiKey = process.env.OPENAI_API_KEY;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const name = req.body;
  //try {
  if (!name) {
    return res.status(400).json({ error: "Invalid file" });
  }
  //console.log(name.data);
  // Make a request to the OpenAI API to suggest names using fetch
  const uploadDir = path.join(process.cwd(), "public/uploads");
  await ensureDirectoryExists(uploadDir);
  //console.log(uploadDir);
  const uniqueFileName = `${uuidv4()}.svg`;
  const newPath = path.join(uploadDir, uniqueFileName);
  //const data = `${atob(name.data)}`;
  const decodedString = name.data;
  
  //const svgElement = document.getElementById(); // Get your SVG element
//   const serializer = new XMLSerializer();
//   const svgString = serializer.serializeToString(data);
//   console.log(svgString);
  //console.log(decodedString);
  // Writing data to the file
  fs.writeFile(newPath, decodedString, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Data written to file successfully.");
  });

//   if (!response.ok) {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }

  res.status(200).json({ uniqueFileName });
  //   } catch (error) {
  //     console.error("Error suggesting names:", error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
};
export default handler;
