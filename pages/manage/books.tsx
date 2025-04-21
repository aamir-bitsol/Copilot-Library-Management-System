import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { Book } from '@prisma/client';

interface NewBook {
    title: string;
    author: string;
    genre: string;
    isbn: string;
    quantity: number;
    publishedAt: string; // Will be converted to DateTime in the API
    available: boolean;
}

const ManageBooksPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [newBook, setNewBook] = useState<NewBook>({
        title: '',
        author: '',
        genre: '',
        isbn: '',
        quantity: 1,
        publishedAt: new Date().toISOString().split('T')[0], // Default to current date
        available: true
    });
    const router = useRouter();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('/api/books');
                const data = await response.json();
                if (Array.isArray(data)) {
                    setBooks(data);
                }
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const handleCreateBook = async () => {
        try {
            const response = await fetch('/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook),
            });

            if (!response.ok) {
                throw new Error('Failed to create book');
            }

            const createdBook = await response.json();
            setBooks([...books, createdBook]);
            setNewBook({ title: '', author: '', genre: '', isbn: '', quantity: 1, publishedAt: new Date().toISOString().split('T')[0], available: true });
        } catch (error) {
            console.error('Error creating book:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/books/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete book');
            }

            setBooks(books.filter(book => book.id !== id));
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-5">Manage Books</h1>

            <div className="mb-5">
                <h2 className="text-xl font-semibold mb-3">Add New Book</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={newBook.title}
                        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="text"
                        placeholder="Author"
                        value={newBook.author}
                        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="text"
                        placeholder="ISBN"
                        value={newBook.isbn}
                        onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="text"
                        placeholder="Genre"
                        value={newBook.genre}
                        onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={newBook.quantity}
                        min="1"
                        onChange={(e) => setNewBook({ ...newBook, quantity: parseInt(e.target.value) || 1 })}
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="date"
                        value={newBook.publishedAt}
                        onChange={(e) => setNewBook({ ...newBook, publishedAt: e.target.value })}
                        className="border p-2 rounded w-full"
                    />
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={newBook.available}
                            onChange={(e) => setNewBook({ ...newBook, available: e.target.checked })}
                            className="mr-2"
                        />
                        <label>Available</label>
                    </div>
                </div>
                <button
                    onClick={handleCreateBook}
                    className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Add Book
                </button>
            </div>

            {books.length === 0 ? (
                <p>No books available.</p>
            ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {books.map((book) => (
                        <li key={book.id} className="border p-4 rounded shadow">
                            <h2 className="text-xl font-semibold">{book.title}</h2>
                            <p>Author: {book.author}</p>
                            <p>Genre: {book.genre}</p>
                            <p>Available: {book.available ? 'Yes' : 'No'}</p>
                            <button 
                                className="mt-2 mr-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={() => router.push(`/manage/books/edit/${book.id}`)}
                            >
                                Edit
                            </button>
                            <button 
                                className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={() => handleDelete(book.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ManageBooksPage;