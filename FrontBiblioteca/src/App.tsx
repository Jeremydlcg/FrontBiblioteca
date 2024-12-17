import React, { useState } from 'react';
import { Book, Library, Users, CheckCircle, XCircle } from 'lucide-react';
import BookList from './components/BookList';
import JsonViewer from './components/JsonViewer';

function App() {
  const [activeView, setActiveView] = useState('books');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Library className="w-6 h-6 text-indigo-600" />
            <span className="text-xl font-semibold text-gray-800">Library Manager</span>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveView('books')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeView === 'books'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              <Book className="w-5 h-5" />
              <span>All Books</span>
            </button>
            <button
              onClick={() => setActiveView('authors')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeView === 'authors'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Authors</span>
            </button>
            <button
              onClick={() => setActiveView('available')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeView === 'available'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              <CheckCircle className="w-5 h-5" />
              <span>Available</span>
            </button>
            <button
              onClick={() => setActiveView('unavailable')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeView === 'unavailable'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              <XCircle className="w-5 h-5" />
              <span>Unavailable</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        {activeView === 'books' && (
          <BookList endpoint="http://localhost:80/books" />
        )}
        {activeView === 'authors' && (
          <JsonViewer 
            endpoint="http://localhost:80/authors"
            title="Authors"
          />
        )}
        {activeView === 'available' && (
          <BookList endpoint="http://localhost:80/books/available" />
        )}
        {activeView === 'unavailable' && (
          <BookList endpoint="http://localhost:80/books/unavailable" />
        )}
      </main>
    </div>
  );
}

export default App;