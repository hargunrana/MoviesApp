import React, { useState, useEffect } from "react";
import genreId from "./getGenreId";
function Favorites() {
    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState([]);
    const [currGenre, setCurrGenre] = useState("");
    const [currText, setCurrText] = useState("");
    const [limit, setLimit] = useState(5);
    const [currPage, setCurrPage] = useState(1);

    let handleCurrGenre = (genre) => setCurrGenre(genre);

    let handleText = (e) => setCurrText(e.target.value);

    // Sorting the Movies
    let sortPopularityAsc = () => {
        let allMovies = movies;
        allMovies.sort((objA, objB) => objA.popularity - objB.popularity);

        setMovies([...allMovies]);
    };
    let sortPopularityDesc = () => {
        let allMovies = movies;
        allMovies.sort((objA, objB) => objB.popularity - objA.popularity);

        setMovies([...allMovies]);
    };

    let sortRatingAsc = () => {
        let allMovies = movies;
        allMovies.sort((objA, objB) => objA.vote_average - objB.vote_average);

        setMovies([...allMovies]);
    };
    let sortRatingDesc = () => {
        let allMovies = movies;
        allMovies.sort((objA, objB) => {
            return objB.vote_average - objA.vote_average;
        });

        setMovies([...allMovies]);
    };

    // Pagination
    let handlePageNum = (page) => setCurrPage(page);

    let handleDelete = (movie) => {
        let newMovies = movies.filter((movieObj) => movie.id !== movieObj.id);

        setMovies([...newMovies]);
        localStorage.setItem("movies", JSON.stringify(newMovies));
    };

    let handlePageNext = () => {
        if (currPage === movies.length / limit) return;

        setCurrPage(currPage + 1);
    };
    let handlePagePrev = () => {
        if (currPage === 1) return;

        setCurrPage(currPage - 1);
    };

    useEffect(() => {
        let res = JSON.parse(localStorage.getItem("movies"));

        let genreArr = [];

        res.map((movieObj) => {
            if (!genreArr.includes(genreId[movieObj.genre_ids[0]])) {
                genreArr.push(genreId[movieObj.genre_ids[0]]);
            }
            return 0;
        });

        genreArr.unshift("All Genres");

        setMovies([...res]);
        setGenre([...genreArr]);
        setCurrGenre("All Genres");
    }, []);

    // Main
    let filteredMovies = movies;

    // Search
    if (currText !== "") {
        filteredMovies = movies.filter((movieObj) => {
            let movieName = movieObj.original_title.toLowerCase();
            return movieName.includes(currText);
        });
    }

    // Genres
    if (currGenre !== "All Genres") {
        filteredMovies = movies.filter(
            (movieObj) => genreId[movieObj.genre_ids[0]] === currGenre
        );
    }

    // Pagination
    let numOfPages =
        filteredMovies.length !== 0
            ? Math.ceil(filteredMovies.length / limit)
            : 0;

    let pagesArr = [];
    for (let i = 1; i <= numOfPages; i++) {
        pagesArr.push(i);
    }

    let si = (currPage - 1) * limit;
    let ei = si + limit - 1;
    filteredMovies = filteredMovies.slice(si, ei + 1);

    return (
        <div className="row">
            {/* Genres*/}
            <div className="col-3">
                <ul className="list-group">
                    {genre.map((genre) => {
                        return currGenre === genre ? (
                            <li
                                key={genre}
                                className="list-group-item active"
                                aria-current="true"
                            >
                                {genre}
                            </li>
                        ) : (
                            <li
                                key={genre}
                                className="list-group-item"
                                aria-current="true"
                                onClick={() => handleCurrGenre(genre)}
                            >
                                {genre}
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* List */}
            <div className="col">
                <div className="row">
                    <input
                        type="text"
                        className="col"
                        placeholder="Search"
                        value={currText}
                        onChange={handleText}
                    ></input>
                    <input
                        type="number"
                        className="col"
                        value={limit}
                        onChange={(e) => setLimit(e.target.value)}
                    ></input>
                </div>

                <div className="row">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Genre</th>
                                <th scope="col">
                                    <i
                                        className="fa-solid fa-caret-up"
                                        onClick={sortPopularityAsc}
                                    />
                                    Popularity
                                    <i
                                        className="fa-solid fa-caret-down"
                                        onClick={sortPopularityDesc}
                                    />
                                </th>
                                <th scope="col">
                                    <i
                                        className="fa-solid fa-caret-up"
                                        onClick={sortRatingAsc}
                                    />
                                    Rating
                                    <i
                                        className="fa-solid fa-caret-down"
                                        onClick={sortRatingDesc}
                                    />
                                </th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMovies.map((movieObj) => (
                                <tr>
                                    <td scope="row">
                                        <img
                                            src={`http://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}
                                            alt="..."
                                            style={{
                                                height: "10vh",
                                                width: "10vw",
                                                marginRight: "1rem",
                                            }}
                                        />
                                        {movieObj.original_title}
                                    </td>
                                    <td>{genreId[movieObj.genre_ids[0]]}</td>
                                    <td>{parseInt(movieObj.popularity)}</td>
                                    <td>{movieObj.vote_average}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger"
                                            style={{ marginRight: "1rem" }}
                                            onClick={() =>
                                                handleDelete(movieObj)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="pagination">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li key="prev" className="page-item">
                            <div className="page-link" onClick={handlePagePrev}>
                                &laquo;
                            </div>
                        </li>

                        {pagesArr.map((page) => (
                            <li key={page} className="page-item">
                                <div
                                    className="page-link"
                                    onClick={() => handlePageNum(page)}
                                >
                                    {page}
                                </div>
                            </li>
                        ))}

                        <li key="next" className="page-item">
                            <div className="page-link" onClick={handlePageNext}>
                                &raquo;
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Favorites;
