import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query as { id: string };
    const filePath = path.join(process.cwd(), 'public/uploads', id);

    try {
        const fileContent = await fs.readFile(filePath);
        res.setHeader('Content-Type', 'image/jpeg'); // Adjust the content type based on your file type
        res.status(200).end(fileContent);
    } catch (error) {
        console.error(error);
        res.status(404).end('Not Found');
    }
}
