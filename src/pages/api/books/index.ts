import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const books = await db.book.findMany(); // Use Prisma's findMany method
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving books', error });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}