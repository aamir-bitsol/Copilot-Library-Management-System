import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { id },
        method,
    } = req;

    switch (method) {
        case 'GET':
            try {
                const book = await prisma.book.findUnique({
                    where: { id: parseInt(id as string, 10) },
                });
                if (!book) {
                    return res.status(404).json({ message: 'Book not found' });
                }
                return res.status(200).json(book);
            } catch (error) {
                return res.status(500).json({ message: 'Internal server error', error });
            }
        default:
            res.setHeader('Allow', ['GET']);
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
}