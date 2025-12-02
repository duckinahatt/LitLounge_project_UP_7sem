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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catalog;