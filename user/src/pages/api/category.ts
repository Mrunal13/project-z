import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { orderBy = "category:asc" } = req.query;

    try {
      // Extract orderBy field and order direction
      const [orderByField, orderDirection] = (orderBy as string).split(":");

      // Fetch categories with optional ordering
      const categoriesWithSubcategories = await prisma.category.findMany({
        orderBy: [
          { [orderByField]: orderDirection || "asc" }, // Order by category
          { subCategory: "asc" }, // Then order by subcategory
        ],
      });
      //console.log(categoriesWithSubcategories);
      res.status(200).json(categoriesWithSubcategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    const { subCategoryName } = req.body;

    if (!subCategoryName) {
      return res.status(400).json({ error: "Subcategory name is required" });
    }

    try {
      // Create a subcategory for the 'other' category
      const newSubcategory = await prisma.category.create({
        data: {
          subCategory: subCategoryName,
          category: "Other",
        },
      });

      res.status(201).json(newSubcategory);
    } catch (error) {
      console.error("Error creating subcategory:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Handle other HTTP methods
    res.status(405).json({ error: "Method not allowed" });
  }
}
