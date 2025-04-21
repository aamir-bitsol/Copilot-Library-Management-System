import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { toast } from 'react-toastify';

interface Book {
  id: number;
  title: string;
  author: string;
  assignedDate: string;
}

const MyBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books/my-books');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setBooks(data);
          } else {
            setBooks([]); // Ensure books is always an array
            setError('No books found or invalid data format received from server');
          }
        } else {
          const data = await response.json();
          setError(data.message || 'Failed to fetch books');
        }
      } catch (err) {
        setError('Failed to fetch books');
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">My Books</h1>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <div key={book.id} className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-bold">{book.title}</h2>
              <p className="text-gray-700">Author: {book.author}</p>
              <p className="text-gray-500 text-sm">Assigned Date: {book.assignedDate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBooks;