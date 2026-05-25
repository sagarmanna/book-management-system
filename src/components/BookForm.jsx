import { useState } from 'react';
import { X } from 'lucide-react';

const initialForm = {
  title: '',
  author: '',
  genre: '',
  publicationYear: '',
};

export default function BookForm({ selectedBook, onSubmit, onClose, isSaving }) {
  const [formData, setFormData] = useState(() => {
    if (!selectedBook) return initialForm;

    return {
      title: selectedBook.title || '',
      author: selectedBook.author || '',
      genre: selectedBook.genre || '',
      publicationYear: selectedBook.publicationYear || '',
    };
  });
  const [validationError, setValidationError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentYear = new Date().getFullYear();
    const publicationYear = Number(formData.publicationYear);

    if (!formData.title.trim() || !formData.author.trim() || !formData.genre.trim()) {
      setValidationError('Please fill in title, author, and genre.');
      return;
    }

    if (!Number.isInteger(publicationYear) || publicationYear < 1000 || publicationYear > currentYear) {
      setValidationError(`Publication year must be between 1000 and ${currentYear}.`);
      return;
    }

    onSubmit({
      title: formData.title.trim(),
      author: formData.author.trim(),
      genre: formData.genre.trim(),
      publicationYear,
    });
  };

  return (
    <div className="modal-overlay">
      <form className="book-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <div>
            <p className="eyebrow">Book Details</p>
            <h2>{selectedBook ? 'Edit Book' : 'Add New Book'}</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close form">
            <X size={20} />
          </button>
        </div>

        <label>
          Title
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Enter book title" required />
        </label>

        <label>
          Author
          <input name="author" value={formData.author} onChange={handleChange} placeholder="Enter author name" required />
        </label>

        <label>
          Genre
          <input name="genre" value={formData.genre} onChange={handleChange} placeholder="e.g. Fiction, Programming" required />
        </label>

        <label>
          Publication Year
          <input
            name="publicationYear"
            type="number"
            min="1000"
            max={new Date().getFullYear()}
            value={formData.publicationYear}
            onChange={handleChange}
            placeholder="e.g. 2024"
            required
          />
        </label>

        {validationError && <p className="form-error">{validationError}</p>}

        <div className="form-actions">
          <button type="button" className="secondary-button" onClick={onClose}>Cancel</button>
          <button type="submit" className="primary-button" disabled={isSaving}>
            {isSaving ? 'Saving...' : selectedBook ? 'Update Book' : 'Add Book'}
          </button>
        </div>
      </form>
    </div>
  );
}
