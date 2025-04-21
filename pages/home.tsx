import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';

type User = {
  name: string;
  role: 'USER' | 'LIBRARIAN' | 'ADMIN';
};

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/user');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-6">Welcome to the Library Management System</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-3">Browse Books</h2>
              <p className="text-gray-600 mb-4">Explore our collection of books and find your next read.</p>
              <a href="/books" className="text-blue-600 hover:text-blue-800 font-medium">
                View Books →
              </a>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-3">My Books</h2>
              <p className="text-gray-600 mb-4">View and manage your borrowed books.</p>
              <a href="/my-books" className="text-green-600 hover:text-green-800 font-medium">
                My Books →
              </a>
            </div>

            {(user?.role === 'ADMIN' || user?.role === 'LIBRARIAN') && (
              <div className="bg-purple-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-3">Manage Library</h2>
                <p className="text-gray-600 mb-4">Add new books and manage the library collection.</p>
                <a href="/manage/books" className="text-purple-600 hover:text-purple-800 font-medium">
                  Manage Books →
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
