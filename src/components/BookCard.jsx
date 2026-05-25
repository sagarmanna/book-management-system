import { motion } from 'framer-motion';
import { BookOpen, Calendar, Edit, Trash2, UserRound } from 'lucide-react';

export default function BookCard({ book, onEdit, onDelete }) {
  const titleInitials = (book.title || 'Book')
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  return (
    <motion.article
      className="book-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="card-top">
        <div className="book-cover" aria-hidden="true">
          <span>{titleInitials}</span>
        </div>
        <div className="card-actions">
          <button className="icon-button" onClick={() => onEdit(book)} aria-label={`Edit ${book.title}`}>
            <Edit size={17} />
          </button>
          <button className="icon-button danger" onClick={() => onDelete(book.id)} aria-label={`Delete ${book.title}`}>
            <Trash2 size={17} />
          </button>
        </div>
      </div>

      <div className="book-content">
        <span className="genre-pill">{book.genre || 'Uncategorized'}</span>
        <h3>{book.title}</h3>
        <div className="book-meta">
          <p className="meta"><UserRound size={16} /> {book.author || 'Unknown author'}</p>
          <p className="meta"><Calendar size={16} /> {book.publicationYear || 'Year not listed'}</p>
          <p className="meta"><BookOpen size={16} /> Available in library</p>
        </div>
      </div>
    </motion.article>
  );
}
