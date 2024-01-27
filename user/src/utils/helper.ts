import fs from "fs/promises";
import path from "path";
import getConfig from "next/config";

export async function ensureDirectoryExists(directory: string): Promise<void> {
  try {
    await fs.access(directory);
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      // Directory doesn't exist, create it
      await fs.mkdir(directory, { recursive: true });
    } else {
      throw error; // or handle the error accordingly
    }
  }
}

export function sanitizeFileName(fileName: string): string {
  // Remove extra spaces, replace spaces with underscores, and convert to lowercase
  return fileName.replace(/\s+/g, "_").trim().toLowerCase();
}

export const serverPath = (staticFilePath: string) => {
  return path.join(
    getConfig().serverRuntimeConfig.PROJECT_ROOT,
    staticFilePath
  );
};

interface SitemapPrompt {
  industrySubCategory: string;
  industry: string;
  business: string;
  brandName: string;
}

export const generatePromptForSitemap = ({
  industryCategory,
  industrySubCategory,
  industry,
  business,
  brandName,
}: SitemapPrompt) => {
  const prompt = `1. [${industryCategory}] industry.
  2. [${industrySubCategory}] sub-industry.
  3. Industry Description: [${industry}].
  4. Business Description: [${business}]. 
  5. Company Name: [${brandName}].
  
  Now create a sitemap for the website based on the above information provided. there should be no childrens, all pages should be part of the single dimention object. I need pages list in the following json object manner, [{"name": "Home","desc": "Discover the story, vision and mission."}]. Description must be less than 50 words.`;
  // const prompt = `1. ${industrySubCategory} industry. description: ${industry}.
  // 2. ${business}.
  // 3. 7 services: a. invisalign, b. implants, c. TMJ disorders, d. prosthetic treatment, e. endodontic treatment, f. conservative treatment, g. gum and preventive treatment.
  // 4. ${brandName}

  // Now create a sitemap per step 8 based on the above information`;

  return prompt;
};

export const sitemapInstructions =
  "Please provide appropriate answer as per the user's need.";

interface BusinessNamePrompt {
  industryCategory: string;
  industrySubCategory: string;
}

export const generatePromptForBusinessName = ({
  industryCategory,
  industrySubCategory,
}: BusinessNamePrompt) => {
  const prompt = `Get creative and come up with 9 unique name for your ${industryCategory} - ${industrySubCategory} business. Each name seperated with ";" and without number text or bullet points. Also, there must not be any prefix or postfix sentence in the result.`;
  // const prompt = `Get creative and come up with a unique name for your ${industryCategory} - ${industrySubCategory} business.`;

  return prompt;
};

export const generatePromptForBusinessLogo = ({
  brandName,
  industryCategory,
  industrySubCategory,
}: BusinessNamePrompt) => {
  const prompt = `Get creative and come up with 9 unique name for your ${industryCategory} - ${industrySubCategory} business. Each name seperated with ";" and without number text or bullet points. Also, there must not be any prefix or postfix sentence in the result.`;
  // Design a logo for [BrandName] that includes the brand name in the design. The style should be modern with clean lines and a minimalist aesthetic. Use ${industryCategory} - ${industrySubCategory}  centric colors. The font should be modern and readable, with a slight organic feel to match the ${industryCategory} - ${industrySubCategory} theme. Include an abstract symbol in the logo.

  return prompt;
};

export const brandNameInstructions =
  "Please provide 10 name based on the users requirements.";
