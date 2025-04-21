import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../utils/db';
import { verifyAuth } from '../../../lib/auth';
import type { Book } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verify authentication
  const user = await verifyAuth(req);
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    try {
      const { title, author, genre, isbn, quantity, publishedAt, available } = req.body;

      if (!title || !author || !genre || !isbn || !publishedAt) {
        return res.status(400).json({ 
          message: 'Title, author, genre, ISBN, and published date are required.' 
        });
      }

      const book = await db.book.create({
        data: {
          title,
          author,
          genre,
          isbn,
          quantity: quantity || 1,
          publishedAt: new Date(publishedAt),
          available: quantity || 1,
          addedBy: {
            connect: { id: user.id }
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return res.status(201).json(book);
    } catch (error: any) {
      console.error('Error creating book:', error);
      if (error.code === 'P2002' && error.meta?.target?.includes('isbn')) {
        return res.status(400).json({ message: 'A book with this ISBN already exists' });
      }
      return res.status(500).json({ message: 'Error creating book' });
    }
  }

  if (req.method === 'GET') {
    try {
      const books = await db.book.findMany({
        include: {
          addedBy: {
            select: {
              name: true,
            },
          },
        },
      });
      return res.status(200).json(books);
    } catch (error) {
      console.error('Error fetching books:', error);
      return res.status(500).json({ message: 'Error fetching books' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}