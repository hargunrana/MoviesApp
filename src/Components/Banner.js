import React from "react";
import movies from "./getMovies";

function Banner() {
    let movie = movies.results;
    return movie === "" ? (
        <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    ) : (
        <div className="banner">
            <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#myCarousel"
                        data-bs-slide-to="0"
                        class="active"
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
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img
                            src={`http://image.tmdb.org/t/p/original/${movie[4].backdrop_path}`}
                            className="card-img-top banner-img"
                            alt="..."
                        />
                        <div class="container">
                            <div class="carousel-caption text-start">
                                <h1>{movie[4].original_title}</h1>
                                <p>{movie[4].overview}</p>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item ">
                        <img
                            src={`http://image.tmdb.org/t/p/original/${movie[12].backdrop_path}`}
                            className="card-img-top banner-img"
                            alt="..."
                        />
                        <div class="container">
                            <div class="carousel-caption text-start">
                                <h1>{movie[12].original_title}</h1>
                                <p>{movie[12].overview}</p>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item ">
                        <img
                            src={`http://image.tmdb.org/t/p/original/${movie[7].backdrop_path}`}
                            className="card-img-top banner-img"
                            alt="..."
                        />
                        <div class="container">
                            <div class="carousel-caption text-start">
                                <h1>{movie[7].original_title}</h1>
                                <p>{movie[7].overview}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#myCarousel"
                    data-bs-slide="prev"
                >
                    <span
                        class="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#myCarousel"
                    data-bs-slide="next"
                >
                    <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default Banner;
