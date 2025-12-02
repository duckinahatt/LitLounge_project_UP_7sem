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
      <div className='container'></div>
    </div>
  );
}

export default Catalog;