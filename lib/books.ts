import { db } from '@/utils/db';
import { Book } from '@/models/Book';

/**
 * Create a new book in the database.
 * @param bookData - The data for the new book.
 * @returns The created book.
 */
export async function createBook(bookData: Partial<Book>) {
  if (typeof window !== 'undefined') {
    throw new Error('Prisma cannot be used in the browser. Use an API route instead.');
  }

  if (!bookData.title || !bookData.author || !bookData.genre) {
    throw new Error('Title, author, and genre are required to create a book.');
  }

  const newBook = await db.book.create({
    data: {
      title: bookData.title,
      author: bookData.author,
      genre: bookData.genre,
      available: bookData.available ?? true,
    },
  });

  return newBook;
}

/**
 * Update an existing book in the database.
 * @param id - The ID of the book to update.
 * @param updateData - The data to update.
 * @returns The updated book.
 */
export async function updateBook(id: string, updateData: Partial<Book>) {
  if (typeof window !== 'undefined') {
    throw new Error('Prisma cannot be used in the browser. Use an API route instead.');
  }

  if (!id) {
    throw new Error('Book ID is required to update a book.');
  }

  const updatedBook = await db.book.update({
    where: { id },
    data: updateData,
  });

  return updatedBook;
}