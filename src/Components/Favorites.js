import React, { Component } from "react";
import { genreId } from "./getMovies";

export default class Favorites extends Component {
    constructor() {
        super();

        this.state = {
            movies: [],
            genre: [],
            currGenre: "",
            currText: "",
            limit: 5,
            currPage: 1,
        };
    }

    handleCurrGenre = (genre) => this.setState({ currGenre: genre });

    handleText = (e) => this.setState({ currText: e.target.value });

    // Sorting the Movies
    sortPopularityAsc = () => {
        let allMovies = this.state.movies;
        allMovies.sort((objA, objB) => objA.popularity - objB.popularity);

        this.setState({ movies: [...allMovies] });
    };
    sortPopularityDesc = () => {
        let allMovies = this.state.movies;
        allMovies.sort((objA, objB) => objB.popularity - objA.popularity);

        this.setState({ movies: [...allMovies] });
    };

    sortRatingAsc = () => {
        let allMovies = this.state.movies;
        allMovies.sort((objA, objB) => objA.vote_average - objB.vote_average);

        this.setState({ movies: [...allMovies] });
    };
    sortRatingDesc = () => {
        let allMovies = this.state.movies;
        allMovies.sort((objA, objB) => {
            return objB.vote_average - objA.vote_average;
        });

        this.setState({ movies: [...allMovies] });
    };

    // Pagination
    handlePageNum = (page) => this.setState({ currPage: page });

    handleDelete = (movie) => {
        let newMovies = this.state.movies.filter(
            (movieObj) => movie.id !== movieObj.id
        );

        this.setState({ movies: [...newMovies] });
        localStorage.setItem("movies", JSON.stringify(newMovies));
    };

    handlePageNext = () => {
        if (this.state.currPage == this.state.movies.length / this.state.limit)
            return;

        this.setState({ currPage: this.state.currPage + 1 });
    };
    handlePagePrev = () => {
        if (this.state.currPage == 1) return;

        this.setState({ currPage: this.state.currPage - 1 });
    };

    async componentDidMount() {
        let res = JSON.parse(localStorage.getItem("movies"));

        let genreArr = [];

        res.map((movieObj) => {
            if (!genreArr.includes(genreId[movieObj.genre_ids[0]])) {
                genreArr.push(genreId[movieObj.genre_ids[0]]);
            }
        });

        genreArr.unshift("All Genres");
        this.setState({
            movies: [...res],
            genre: [...genreArr],
            currGenre: "All Genres",
        });
    }

    render() {
        let filteredMovies = this.state.movies;

        // Search
        if (this.state.currText !== "") {
            filteredMovies = this.state.movies.filter((movieObj) => {
                let movieName = movieObj.original_title.toLowerCase();
                return movieName.includes(this.state.currText);
            });
        }

        // Genres
        if (this.state.currGenre !== "All Genres") {
            filteredMovies = this.state.movies.filter(
                (movieObj) =>
                    genreId[movieObj.genre_ids[0]] === this.state.currGenre
            );
        }

        // Pagination
        let numOfPages =
            filteredMovies.length != 0
                ? Math.ceil(filteredMovies.length / this.state.limit)
                : 0;

        let pagesArr = [];
        for (let i = 1; i <= numOfPages; i++) {
            pagesArr.push(i);
        }

        let si = (this.state.currPage - 1) * this.state.limit;
        let ei = si + this.state.limit - 1;
        filteredMovies = filteredMovies.slice(si, ei + 1);

        return (
            <div className="row">
                <div className="col-3">
                    <ul className="list-group">
                        {this.state.genre.map((genre) => {
                            return this.state.currGenre === genre ? (
                                <li
                                    className="list-group-item active"
                                    aria-current="true"
                                    // onClick={() => this.handleCurrGenre(genre)}
                                >
                                    {genre}
                                </li>
                            ) : (
                                <li
                                    className="list-group-item"
                                    aria-current="true"
                                    onClick={() => this.handleCurrGenre(genre)}
                                >
                                    {genre}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="col">
                    <div className="row">
                        <input
                            type="text"
                            className="col"
                            placeholder="Search"
                            value={this.state.currText}
                            onChange={this.handleText}
                        ></input>
                        <input
                            type="number"
                            className="col"
                            placeholder="5"
                        ></input>
                    </div>

                    <div className="row">
                        <table className="table">
                            <thead>
                                <tr>
                                    {/* <th scope="col">Image</th> */}
                                    <th scope="col">Title</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col">
                                        <i
                                            class="fa-solid fa-caret-up"
                                            onClick={this.sortPopularityAsc}
                                        />
                                        Popularity
                                        <i
                                            class="fa-solid fa-caret-down"
                                            onClick={this.sortPopularityDesc}
                                        />
                                    </th>
                                    <th scope="col">
                                        <i
                                            class="fa-solid fa-caret-up"
                                            onClick={this.sortRatingAsc}
                                        />
                                        Rating
                                        <i
                                            class="fa-solid fa-caret-down"
                                            onClick={this.sortRatingDesc}
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
                                        <td>
                                            {genreId[movieObj.genre_ids[0]]}
                                        </td>
                                        <td>{parseInt(movieObj.popularity)}</td>
                                        <td>{movieObj.vote_average}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger"
                                                style={{ marginRight: "1rem" }}
                                                onClick={() =>
                                                    this.handleDelete(movieObj)
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

                <div className="pagination">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item">
                                <a
                                    className="page-link"
                                    onClick={this.handlePagePrev}
                                >
                                    &laquo;
                                </a>
                            </li>

                            {pagesArr.map((page) => (
                                <li className="page-item">
                                    <a
                                        className="page-link"
                                        onClick={() => this.handlePageNum(page)}
                                    >
                                        {page}
                                    </a>
                                </li>
                            ))}

                            <li className="page-item">
                                <a
                                    className="page-link"
                                    onClick={this.handlePageNext}
                                >
                                    &raquo;
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}
