import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../lib/db';
import { Book } from '../../../../models/Book';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const books = await Book.findAll();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving books', error });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}