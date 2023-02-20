import React from "react";
import movies from "./getMovies";

function Banner() {
    let movie = movies.results;

    let carouselItems = [
        Math.floor(Math.random() * 21),
        Math.floor(Math.random() * 21),
        Math.floor(Math.random() * 21),
    ];
    return movie === "" ? (
        <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    ) : (
        <div className="banner">
            <div
                id="myCarousel"
                className="carousel slide"
                data-bs-ride="carousel"
            >
                <div className="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#myCarousel"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#myCarousel"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#myCarousel"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                    ></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            src={`http://image.tmdb.org/t/p/original/${
                                movie[carouselItems[0]].backdrop_path
                            }`}
                            className="card-img-top banner-img"
                            alt="..."
                        />
                        <div className="container">
                            <div className="carousel-caption text-start">
                                <h1>
                                    {movie[carouselItems[0]].original_title}
                                </h1>
                                <p>{movie[carouselItems[0]].overview}</p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item ">
                        <img
                            src={`http://image.tmdb.org/t/p/original/${
                                movie[carouselItems[1]].backdrop_path
                            }`}
                            className="card-img-top banner-img"
                            alt="..."
                        />
                        <div className="container">
                            <div className="carousel-caption text-start">
                                <h1>
                                    {movie[carouselItems[1]].original_title}
                                </h1>
                                <p>{movie[carouselItems[1]].overview}</p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item ">
                        <img
                            src={`http://image.tmdb.org/t/p/original/${
                                movie[carouselItems[2]].backdrop_path
                            }`}
                            className="card-img-top banner-img"
                            alt="..."
                        />
                        <div className="container">
                            <div className="carousel-caption text-start">
                                <h1>
                                    {movie[carouselItems[2]].original_title}
                                </h1>
                                <p>{movie[carouselItems[2]].overview}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#myCarousel"
                    data-bs-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#myCarousel"
                    data-bs-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default Banner;
