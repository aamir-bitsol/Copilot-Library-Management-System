export const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  BOOKS: '/api/books',
  BOOK_DETAILS: (id: string) => `/api/books/${id}`,
};

export const ERROR_MESSAGES = {
  USER_NOT_FOUND: 'User not found.',
  INVALID_CREDENTIALS: 'Invalid username or password.',
  BOOK_NOT_FOUND: 'Book not found.',
  REGISTRATION_FAILED: 'Registration failed. Please try again.',
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful.',
  REGISTRATION_SUCCESS: 'Registration successful.',
};