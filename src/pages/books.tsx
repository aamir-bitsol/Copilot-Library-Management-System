import { useEffect, useState } from 'react';

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('/api/books');
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-5">Browse Books</h1>
            {books.length === 0 ? (
                <p>No books available.</p>
            ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {books.map((book: any) => (
                        <li key={book.id} className="border p-4 rounded shadow">
                            <h2 className="text-xl font-semibold">{book.title}</h2>
                            <p>Author: {book.author}</p>
                            <p>Genre: {book.genre}</p>
                            <p>Available: {book.available}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BooksPage;