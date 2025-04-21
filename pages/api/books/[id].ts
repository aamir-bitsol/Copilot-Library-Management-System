import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'GET':
            try {
                const book = await db.book.findUnique({ where: { id: Number(id) } });
                if (!book) {
                    return res.status(404).json({ error: 'Book not found' });
                }
                res.status(200).json(book);
            } catch (error) {
                res.status(500).json({ error: 'Failed to fetch book' });
            }
            break;
        case 'PUT':
            try {
                const { title, author, genre, available } = req.body;
                const updatedBook = await db.book.update({
                    where: { id: Number(id) },
                    data: { title, author, genre, available },
                });
                res.status(200).json(updatedBook);
            } catch (error) {
                res.status(500).json({ error: 'Failed to update book' });
            }
            break;
        case 'DELETE':
            try {
                await db.book.delete({ where: { id: Number(id) } });
                res.status(204).end();
            } catch (error) {
                res.status(500).json({ error: 'Failed to delete book' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}