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
