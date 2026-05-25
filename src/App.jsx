import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { BookOpenCheck, CalendarDays, LibraryBig, Moon, Plus, SearchX, Sun, Tags } from 'lucide-react';
import BookCard from './components/BookCard.jsx';
import BookForm from './components/BookForm.jsx';
import SearchAndFilter from './components/SearchAndFilter.jsx';
import { addBook, deleteBook, getBooks, updateBook } from './services/bookApi.js';

const normalizeBooks = (data) => (Array.isArray(data) ? data : []);

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('book-theme') || 'light');
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getBooks();
      setBooks(normalizeBooks(data));
    } catch {
      setError('Unable to load books. Please check your API URL or internet connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('book-theme', theme);
  }, [theme]);

  useEffect(() => {
    let isActive = true;

    const loadInitialBooks = async () => {
      try {
        const data = await getBooks();
        if (isActive) {
          setBooks(normalizeBooks(data));
        }
      } catch {
        if (isActive) {
          setError('Unable to load books. Please check your API URL or internet connection.');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadInitialBooks();

    return () => {
      isActive = false;
    };
  }, []);

  const genres = useMemo(() => {
    return [...new Set(books.map((book) => book.genre).filter(Boolean))].sort();
  }, [books]);

  const filteredBooks = useMemo(() => {
    const visibleBooks = books.filter((book) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        book.title?.toLowerCase().includes(search) ||
        book.author?.toLowerCase().includes(search);
      const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });

    return [...visibleBooks].sort((a, b) => {
      if (sortBy === 'newest') {
        return Number(b.publicationYear || 0) - Number(a.publicationYear || 0);
      }

      if (sortBy === 'oldest') {
        return Number(a.publicationYear || 0) - Number(b.publicationYear || 0);
      }

      return String(a[sortBy] || '').localeCompare(String(b[sortBy] || ''));
    });
  }, [books, searchTerm, selectedGenre, sortBy]);

  const latestPublicationYear = useMemo(() => {
    const years = books.map((book) => Number(book.publicationYear)).filter(Boolean);
    return years.length ? Math.max(...years) : 0;
  }, [books]);

  const openAddForm = () => {
    setSelectedBook(null);
    setIsFormOpen(true);
  };

  const openEditForm = (book) => {
    setSelectedBook(book);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setSelectedBook(null);
    setIsFormOpen(false);
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  const handleSubmit = async (bookData) => {
    try {
      setSaving(true);

      if (selectedBook) {
        const updated = await updateBook(selectedBook.id, bookData);
        setBooks((prev) => prev.map((book) => (book.id === selectedBook.id ? updated : book)));
        toast.success('Book updated successfully');
      } else {
        const created = await addBook(bookData);
        setBooks((prev) => [created, ...prev]);
        toast.success('Book added successfully');
      }

      closeForm();
    } catch {
      toast.error('Something went wrong while saving the book');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this book?');
    if (!confirmed) return;

    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((book) => book.id !== id));
      toast.success('Book deleted successfully');
    } catch {
      toast.error('Unable to delete book');
    }
  };

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <h1><LibraryBig size={36} /> Book Management System</h1>
        </div>
        <div className="hero-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button className="primary-button" onClick={openAddForm}>
            <Plus size={18} /> Add Book
          </button>
        </div>
      </section>

      <section className="summary-grid" aria-label="Library summary">
        <div className="summary-item">
          <BookOpenCheck size={22} />
          <div>
            <strong>{books.length}</strong>
            <span>Total Books</span>
          </div>
        </div>
        <div className="summary-item">
          <Tags size={22} />
          <div>
            <strong>{genres.length}</strong>
            <span>Genres</span>
          </div>
        </div>
        <div className="summary-item">
          <CalendarDays size={22} />
          <div>
            <strong>{latestPublicationYear || '-'}</strong>
            <span>Latest Year</span>
          </div>
        </div>
      </section>

      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        sortBy={sortBy}
        setSortBy={setSortBy}
        genres={genres}
      />

      {loading && <div className="state-card">Loading books...</div>}
      {error && !loading && (
        <div className="state-card error">
          <p>{error}</p>
          <button className="secondary-button" onClick={fetchBooks}>
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && filteredBooks.length === 0 && (
        <div className="state-card empty-state">
          <SearchX size={36} />
          <p>No books found.</p>
          <button className="secondary-button" onClick={openAddForm}>
            <Plus size={16} /> Add Book
          </button>
        </div>
      )}

      {!loading && !error && filteredBooks.length > 0 && (
        <>
          <section className="section-heading">
            <div>
              <h2>Library Books</h2>
              <p>Showing {filteredBooks.length} of {books.length} books</p>
            </div>
          </section>

          <div className="books-scroll">
            <section className="book-grid">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} onEdit={openEditForm} onDelete={handleDelete} />
              ))}
            </section>
          </div>
        </>
      )}

      {isFormOpen && (
        <BookForm
          key={selectedBook?.id || 'new-book'}
          selectedBook={selectedBook}
          onSubmit={handleSubmit}
          onClose={closeForm}
          isSaving={saving}
        />
      )}
    </main>
  );
}
