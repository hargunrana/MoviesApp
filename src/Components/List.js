import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "../secrets";
let URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=`;

function List() {
    const [hover, setHover] = useState("");
    const [parr, setParr] = useState([1]);
    const [currPage, setCurrPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [favoritesMovies, setFavoritesMovies] = useState([]);

    // Favorite/Remove button hovering
    let handleEnter = (id) => setHover(id);

    let handleLeave = () => setHover("");

    // API request for movies
    let changeMovies = async () => {
        let res = await axios.get(URL + currPage);

        setMovies([...res.data.results]);
    };

    // Pagination
    let handleNext = () => {
        let tempArr = parr;
        let newVal = tempArr[tempArr.length - 1] + 1;

        setParr([...parr, newVal]);
        setCurrPage(currPage + 1);
    };

    let handlePrevious = () => {
        if (currPage === 1) return;

        setCurrPage(currPage - 1);
    };

    let handlePageNum = (pageNum) => setCurrPage(pageNum);

    // Favorites
    let handleFavorites = (movieObj) => {
        let localStorageMovies =
            JSON.parse(localStorage.getItem("movies")) || [];

        if (favoritesMovies.includes(movieObj.id)) {
            localStorageMovies = localStorageMovies.filter(
                (movie) => movie.id !== movieObj.id
            );
        } else localStorageMovies.push(movieObj);

        localStorage.setItem("movies", JSON.stringify(localStorageMovies));

        let tempData = localStorageMovies.map((movieObj) => movieObj.id);

        setFavoritesMovies([...tempData]);
    };

    useEffect(() => {
        changeMovies();
    });

    let movie = movies;
    return (
        <>
            {movie.length === 0 ? (
                <div className="spinner-grow text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : (
                <div>
                    <h3 className="text-center">
                        <strong>Trending</strong>
                    </h3>

                    <div className="movies-list">
                        {movie.map((movieObj) => {
                            return (
                                <div
                                    className="card movies-card"
                                    onMouseEnter={() =>
                                        handleEnter(movieObj.id)
                                    }
                                    onMouseLeave={handleLeave}
                                >
                                    <img
                                        src={`http://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}
                                        className="card-img-top movies-img"
                                        alt="..."
                                        style={{
                                            height: "25vh",
                                        }}
                                    />

                                    <h5 className="card-title movies-title ">
                                        {movieObj.original_title}
                                    </h5>
                                    <div className="button-wrapper ">
                                        {hover === movieObj.id &&
                                            (favoritesMovies.includes(
                                                movieObj.id
                                            ) ? (
                                                <div
                                                    className="btn btn-danger movies-button"
                                                    onClick={() =>
                                                        handleFavorites(
                                                            movieObj
                                                        )
                                                    }
                                                >
                                                    Remove
                                                </div>
                                            ) : (
                                                <div
                                                    className="btn btn-primary movies-button"
                                                    onClick={() =>
                                                        handleFavorites(
                                                            movieObj
                                                        )
                                                    }
                                                >
                                                    Add to Favorites
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="pagination">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item">
                                    <div
                                        className="page-link"
                                        onClick={handlePrevious}
                                    >
                                        &laquo;
                                    </div>
                                </li>

                                {parr.map((pageNum) => (
                                    <li className="page-item">
                                        <div
                                            className="page-link"
                                            onClick={() => {
                                                handlePageNum(pageNum);
                                            }}
                                        >
                                            {pageNum}
                                        </div>
                                    </li>
                                ))}

                                <li className="page-item">
                                    <div
                                        className="page-link"
                                        onClick={handleNext}
                                    >
                                        &raquo;
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}

export default List;
