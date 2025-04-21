import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { verifyAuth } from '@/lib/auth';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Verify authentication and get user
    const user = await verifyAuth(req);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    switch (req.method) {
      case 'GET':
        // Anyone can view books
        const books = await prisma.book.findMany({
          include: {
            addedBy: {
              select: {
                name: true,
              },
            },
          },
        });
        return res.status(200).json(books);

      case 'POST':
        // Only admin and librarian can add books
        if (!['ADMIN', 'LIBRARIAN'].includes(user.role)) {
          return res.status(403).json({ message: 'Forbidden' });
        }

        const { title, author, isbn, genre, quantity, publishedAt } = req.body;

        // Validate input
        if (!title || !author || !isbn || !genre || !quantity || !publishedAt) {
          return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if book with ISBN already exists
        const existingBook = await prisma.book.findUnique({
          where: { isbn },
        });

        if (existingBook) {
          return res.status(400).json({ message: 'Book with this ISBN already exists' });
        }

        // Create new book
        const newBook = await prisma.book.create({
          data: {
            title,
            author,
            isbn,
            genre,
            quantity: parseInt(quantity),
            available: parseInt(quantity),
            publishedAt: new Date(publishedAt),
            addedById: user.id,
          },
        });

        return res.status(201).json(newBook);

      case 'PUT':
        // Only admin and librarian can update books
        if (!['ADMIN', 'LIBRARIAN'].includes(user.role)) {
          return res.status(403).json({ message: 'Forbidden' });
        }

        const { id, ...updateData } = req.body;

        if (!id) {
          return res.status(400).json({ message: 'Book ID is required' });
        }

        // Update book
        const updatedBook = await prisma.book.update({
          where: { id: parseInt(id) },
          data: {
            ...updateData,
            quantity: updateData.quantity ? parseInt(updateData.quantity) : undefined,
            available: updateData.quantity ? parseInt(updateData.quantity) : undefined,
            publishedAt: updateData.publishedAt ? new Date(updateData.publishedAt) : undefined,
          },
        });

        return res.status(200).json(updatedBook);

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Books API Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
} 