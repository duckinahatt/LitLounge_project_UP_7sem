import React from "react";
import { getBooksByMinRating, books } from './../../data/books';
import { Link } from "react-router-dom";
import './Home.css';

function Home() {
  const filteredBooks = getBooksByMinRating(4.8);

  const slides = [];
  for (let i = 0; i < filteredBooks.length; i += 3) {
    slides.push(filteredBooks.slice(i, i + 3));
  }

  return (
    <div className="container mt-4">
      <div className="row g-2">
        <div className="col-md-8">
          <div id="mainCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#mainCarousel"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Слайд 1"
              ></button>
              <button
                type="button"
                data-bs-target="#mainCarousel"
                data-bs-slide-to="1"
                aria-label="Слайд 2"
              ></button>
              <button
                type="button"
                data-bs-target="#mainCarousel"
                data-bs-slide-to="2"
                aria-label="Слайд 3"
              ></button>
            </div>

            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="/assets/img/slider/slider1.jpg"
                  className="d-block w-100"
                  alt="Слайд 1"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h2 className="title-shadow">Ждем коллекционеров в гости</h2>
                  <p className="title-shadow">У нас вы можете найти антикварные издания</p>
                </div>
              </div>

              <div className="carousel-item">
                <img
                  src="/assets/img/slider/slider2.svg"
                  className="d-block w-100"
                  alt="Слайд 2"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h2 className="title-shadow">Акция!!!</h2>
                  <p className="title-shadow">Уникальное предложение - 2100 рублей за 2 книги цикла Благословение Небожителей</p>
                </div>
              </div>

              <div className="carousel-item">
                <img
                  src="/assets/img/slider/slider3.jpg"
                  className="d-block w-100"
                  alt="Слайд 3"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h2 className="title-shadow">Вечер в компании хорошей книги</h2>
                  <p className="title-shadow">
                    Подберите идеальное издание для уютных зимних вечеров — от классики до новых хитов
                  </p>
                </div>
              </div>
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#mainCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Предыдущий</span>
            </button>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#mainCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Следующий</span>
            </button>
          </div>
        </div>

        <div className="col-md-4 d-flex flex-column justify-content-between gap-2">
          <div className="d-flex justify-content-between align-items-center gap-2 advice">
            <div>
              <h3>Книги, которые хочется дарить</h3>
              <p>Подборка тёплых историй для зимних вечеров и новогодних чудес</p>
            </div>
            <img src="/assets/img/icons/Present.svg" className="icon" alt="подарок" />
          </div>
          <div className="d-flex justify-content-between align-items-center advice">
            <div>
              <h3>Идеальный подарок — книга</h3>
              <p>Фильтры по интересам и возрасту помогут выбрать историю для каждого</p>
            </div>
            <img src="/assets/img/icons/Filter.svg" className="icon" alt="фильтр" />
          </div>
          <div className="d-flex justify-content-between align-items-center gap-2 advice">
            <div>
              <h3>Читай и играй вместе</h3>
              <p>Книги, комиксы и настольные игры для уютных встреч с друзьями</p>
            </div>
            <img src="/assets/img/icons/Cube.svg" className="icon" alt="кубик" />
          </div>
        </div>
      </div>

      {slides.length > 0 && (
        <div className="mt-5">
          <h2 className="mb-3">Лучшие произведения</h2>

          <div id="booksCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">

              {slides.map((group, idx) => (
                <div
                  key={idx}
                  className={`carousel-item ${idx === 0 ? 'active' : ''}`}
                >
                  <div className="row row-cols-1 row-cols-md-3 g-4">
                    {group.map(book => (
                      <div key={book.id} className="col">
                        <Link
                          to={`/product/${book.id}`}
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
                                  e.target.src =
                                    'https://via.placeholder.com/300x400?text=No+Cover';
                                }}
                              />
                            </div>
                            <div className="card-body">
                              <h5 className="card-title book-title">{book.title}</h5>
                              <h6 className="card-subtitle mb-2 text-muted book-author">
                                {book.author}
                              </h6>
                              <p className="text-muted mb-1">{book.genre}</p>
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
                </div>
              ))}

            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#booksCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Предыдущий</span>
            </button>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#booksCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Следующий</span>
            </button>
          </div>
        </div>
      )}
    </div>

  );
}

export default Home;