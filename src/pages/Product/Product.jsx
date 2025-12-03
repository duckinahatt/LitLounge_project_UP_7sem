import React from 'react';
import { useParams } from 'react-router-dom';
import { books } from './../../data/books';
import './Product.css';

function Product() {
  const {id} = useParams();
  const product = books.find(book => book.id === parseInt(id));

  if(!product) {
    return <div>Товар не найден</div>
  }
  
  return (
    <div className='product-card'>
      <img src={product.book_img} alt={product.title} className='product-image'/>
      <h2 className="product-title">{product.title}</h2>
      <p className="product-author"><strong>Автор:</strong> {product.author}</p>
      <p className="product-genre"><strong>Жанр:</strong> {product.genre}</p>
      <p className="product-description">{product.description}</p>
      <p className="product-price">Цена: {product.price} ₽</p>
      <div className="product-rating">
        <strong>Рейтинг:</strong> {product.rating} ⭐️ ({product.reviews} отзывов)
      </div>
    </div>
  );
}

export default Product;
