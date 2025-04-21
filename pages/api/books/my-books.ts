import { NextApiRequest, NextApiResponse } from 'next';
import { verifyAuth } from '../../../lib/auth';
import { db } from '../../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Verify authentication
    const user = await verifyAuth(req);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Handle GET request
    if (req.method === 'GET') {
      const books = await db.borrow.findMany({
        where: { userId: user.id },
        include: {
          book: true,
        },
      });

      const formattedBooks = books.map((borrow) => ({
        id: borrow.book.id,
        title: borrow.book.title,
        author: borrow.book.author,
        assignedDate: borrow.book.createdAt,
      }));

      return res.status(200).json(formattedBooks);
    }

    // Method not allowed
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error('Error fetching user books:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}