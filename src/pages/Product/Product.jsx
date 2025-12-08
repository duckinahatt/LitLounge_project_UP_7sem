import React from 'react';
import { useParams, Link } from 'react-router-dom'; // добавьте Link сюда
import { books } from './../../data/books';
import './Product.css';

function Product() {
  const { id } = useParams();
  const product = books.find(book => book.id === parseInt(id));

  if (!product) {
    return <div>Товар не найден</div>;
  }

  // Находим книги того же жанра, исключая текущий товар
  const similarBooks = books
    .filter(book => book.genre === product.genre && book.id !== product.id)
    .slice(0, 3); // Берем первые 3 книги

  return (
    <div>
      {/* Основной продукт */}
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
      
      <h3>Похожие книги в жанре "{product.genre}":</h3>
      <div className='similar-books'>
        {similarBooks.length > 0 ? (
          similarBooks.map(book => (
            <Link key={book.id} to={`/product/${book.id}`} className='similar-book-link'> 
              <div className='similar-book-card'>
                <img src={book.book_img} alt={book.title} className='similar-book-image'/>
                <h4 className='similar-book-title'>{book.title}</h4>
                <p className='similar-book-author'><strong>Автор:</strong> {book.author}</p>
                <p className='similar-book-price'>Цена: {book.price} ₽</p>
              </div>
            </Link>
          ))
        ) : (
          <p>Похожих книг не найдено.</p>
        )}
      </div>
    </div>
  );
}

export default Product;

