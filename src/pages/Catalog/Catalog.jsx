import React, { useState, useEffect } from 'react';
import { books, getUniqueGenres, getUniqueAuthors, getPriceRange } from './../../data/books';
import { Link } from 'react-router-dom';
import './Catalog.css';

function Catalog() {
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [selectedGenre, setSelectedGenre] = useState('Все');
  const [selectedAuthor, setSelectedAuthor] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  const genres = getUniqueGenres();
  const authors = getUniqueAuthors();
  const { min: minPrice, max: maxPrice } = getPriceRange();

  useEffect(() => {
    let result = [...books];

    if (selectedGenre !== 'Все') {
      result = result.filter(book => book.genre === selectedGenre);
    }

    if (selectedAuthor !== 'Все') {
      result = result.filter(book => book.author === selectedAuthor);
    }

    result = result.filter(book =>
      book.price >= priceRange.min && book.price <= priceRange.max
    );

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query) ||
        book.genre.toLowerCase().includes(query)
      );
    }

    setFilteredBooks(result);
  }, [selectedGenre, selectedAuthor, searchQuery, priceRange]);

  const resetFilters = () => {
    setSelectedGenre('Все');
    setSelectedAuthor('Все');
    setSearchQuery('');
    setPriceRange({ min: minPrice, max: maxPrice });
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    if (e.target.name === 'minPrice') {
      setPriceRange(prev => ({ ...prev, min: value }));
    } else {
      setPriceRange(prev => ({ ...prev, max: value }));
    }
  };

  return (
    <div>
      <div className='container'>
        <div className="row">
          <div className="col-lg-3 mb-4">
            <div className="filters-sidebar">
              <div className="d-flex justify-content-between align-items-end mb-4">
                <h3 className="mb-0">Фильтры</h3>
                <button
                  onClick={resetFilters}
                  className="btn btn-sm"
                >
                  Сбросить
                </button>
              </div>

              <div className="filter-section mb-4">
                <h5 className="filter-title mb-3"> Жанр </h5>
                <div className="filter-options">
                  {genres.map(genre => (
                    <button
                      key={genre}
                      className={`filter-chip ${selectedGenre === genre ? 'active' : ''}`}
                      onClick={() => setSelectedGenre(genre)}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-section mb-4">
                <h5 className="filter-title mb-3">Автор</h5>
                <div className="filter-select">
                  <select
                    className="form-select"
                    value={selectedAuthor}
                    onChange={(e) => setSelectedAuthor(e.target.value)}
                  >
                    {authors.map(author => (
                      <option key={author} value={author}>
                        {author}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="filter-section mb-4">
                <h5 className="filter-title mb-3">Цена, ₽</h5>
                <div className="row g-2">
                  <div className="col">
                    <label className="form-label small text-muted">От</label>
                    <input
                      type="number"
                      className="form-control"
                      name="minPrice"
                      min={minPrice}
                      max={priceRange.max}
                      value={priceRange.min}
                      onChange={handlePriceChange}
                    />
                  </div>
                  <div className="col">
                    <label className="form-label small text-muted">До</label>
                    <input
                      type="number"
                      className="form-control"
                      name="maxPrice"
                      min={priceRange.min}
                      max={maxPrice}
                      value={priceRange.max}
                      onChange={handlePriceChange}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={resetFilters}
                className="btn w-100 mt-3"
              >
                Сбросить
              </button>
            </div>
          </div>


          <div className="col-lg-9">
            {filteredBooks.length === 0 && (
              <div className="no-results text-center py-5">
                <h4 className="mb-3">Книги не найдены</h4>
                <p className="text-muted mb-4">
                  Попробуйте изменить параметры фильтрации
                </p>
                <button
                  onClick={resetFilters}
                  className="btn"
                >
                  Сбросить все фильтры
                </button>
              </div>
            )}

            {filteredBooks.length > 0 && (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {filteredBooks.map(book => (
                  <div key={book.id} className="col">
                    <Link
                      to={`/product/${book.id}`} // Переход на страницу продукта с ID
                      className="text-decoration-none"
                      style={{ color: 'inherit' }}
                    >
                      <div className="card book-card h-100 shadow-sm">
                        <div className="book-image-container">
                          <img
                            src={book.book_img}
                            className="card-img-top book-cover"
                            alt={`Обложка: ${book.title}`}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/300x400?text=No+Cover";
                            }}
                          />
                        </div>
                        <div className="card-body">
                          <h5 className="card-title book-title">{book.title}</h5>
                          <h6 className="card-subtitle mb-2 text-muted book-author">
                            {book.author}
                          </h6>
                          <div className="mb-2">
                            <p className='text-muted'>{book.genre}</p>
                          </div>
                          <p className="card-text book-description">
                            {book.description.length > 80
                              ? `${book.description.substring(0, 80)}...`
                              : book.description}
                          </p>
                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <span className="book-price fw-bold text-brown">
                              {book.price} ₽
                            </span>
                            {book.rating && (
                              <span className="book-rating">
                                ⭐ {book.rating.toFixed(1)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catalog;