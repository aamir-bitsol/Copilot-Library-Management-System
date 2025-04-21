import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BookList from '../components/BookList';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/auth/user', {
                method: 'GET',
                credentials: 'include',
            });

            if (res.ok) {
                const userData = await res.json();
                setUser(userData);
            } else {
                router.push('/'); // Redirect to home if not authenticated
            }
        };

        fetchUser();
    }, [router]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Welcome, {user.username}</h1>
            <h2>Your Books</h2>
            <BookList />
        </div>
    );
};

export default Dashboard;