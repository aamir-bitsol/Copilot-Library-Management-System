import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type User = {
  name: string;
  role: 'USER' | 'LIBRARIAN' | 'ADMIN';
};

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/user');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/auth/login');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/home" className="text-xl font-bold">
              Library System
            </Link>
          </div>

          {user ? (
            <div className="flex items-center space-x-4">
              <Link href="/books" className="hover:text-blue-200">
                Browse Books
              </Link>

              {/* Admin and Librarian links */}
              {(user.role === 'ADMIN' || user.role === 'LIBRARIAN') && (
                <>
                  <Link href="/books/add" className="hover:text-blue-200">
                    Add Book
                  </Link>
                  <Link href="/books/manage" className="hover:text-blue-200">
                    Manage Books
                  </Link>
                </>
              )}

              {/* Admin-only links */}
              {user.role === 'ADMIN' && (
                <Link href="/admin/users" className="hover:text-blue-200">
                  Manage Users
                </Link>
              )}

              {/* User links */}
              <Link href="/my-books" className="hover:text-blue-200">
                My Books
              </Link>

              <div className="flex items-center space-x-4">
                <span className="text-sm">
                  {user.name} ({user.role})
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/auth/login" className="hover:text-blue-200">
                Login
              </Link>
              <Link href="/auth/signup" className="hover:text-blue-200">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 