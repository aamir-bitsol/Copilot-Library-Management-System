import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../lib/db';
import { Book } from '../../../models/Book';

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { id },
        method,
    } = req;

    switch (method) {
        case 'GET':
            try {
                const book = await Book.findByPk(id);
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