import React, { useEffect, useState } from 'react';
import { Book as BookIcon } from 'lucide-react';

interface Book {
  id: number;
  title: string;
  author: string;
  available: boolean;
}

interface BookListProps {
  endpoint: string;
}

function BookList({ endpoint }: BookListProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Failed to fetch books');
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [endpoint]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <div
          key={book.id}
          className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
        >
          <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
            <BookIcon className="w-20 h-20 text-white" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{book.title}</h3>
            <p className="text-gray-600 mb-4">By {book.author}</p>
            <div className="flex items-center">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  book.available
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {book.available ? 'Available' : 'Unavailable'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookList;