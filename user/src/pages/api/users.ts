import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const results = await prisma.user.findMany();
    return res.status(200).json(results);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
