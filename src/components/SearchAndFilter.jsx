import { Search } from 'lucide-react';

export default function SearchAndFilter({
  searchTerm,
  setSearchTerm,
  selectedGenre,
  setSelectedGenre,
  sortBy,
  setSortBy,
  genres,
}) {
  return (
    <div className="toolbar">
      <div className="search-box">
        <Search size={18} />
        <label className="sr-only" htmlFor="book-search">Search books</label>
        <input
          id="book-search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by title or author..."
        />
      </div>

      <label className="sr-only" htmlFor="genre-filter">Filter by genre</label>
      <select id="genre-filter" value={selectedGenre} onChange={(event) => setSelectedGenre(event.target.value)}>
        <option value="all">All Genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>

      <label className="sr-only" htmlFor="sort-books">Sort books</label>
      <select id="sort-books" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
        <option value="title">Sort by Title</option>
        <option value="author">Sort by Author</option>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  );
}
