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
  industrySubCategory,
  industry,
  business,
  brandName,
}: SitemapPrompt) => {
  const prompt = `1. ${industrySubCategory} industry. description: ${industry}.
  2. ${business}. 
  3. ${brandName}
  
  Now create a sitemap per step 8 based on the above information`;
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
  const prompt = `Get creative and come up with 10 unique name for your ${industryCategory} - ${industrySubCategory} business.`;
  // const prompt = `Get creative and come up with a unique name for your ${industryCategory} - ${industrySubCategory} business.`;

  return prompt;
};

export const brandNameInstructions =
  "Please provide 10 name based on the users requirements.";
