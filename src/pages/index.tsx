import React from 'react';
import AuthForm from '../components/AuthForm';
import BookList from '../components/BookList';

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to the Library Management System</h1>
            <AuthForm />
            <BookList />
        </div>
    );
};

export default HomePage;