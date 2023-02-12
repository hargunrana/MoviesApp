import React, { Component } from "react";
import axios from "axios";
import { API_KEY } from "../secrets";
let URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=`;

export default class List extends Component {
    constructor() {
        super();
        this.state = {
            hover: "",
            parr: [1],
            currPage: 1,
            movies: [],
            favoritesMovies: [],
        };
    }

    handleEnter = (id) => this.setState({ hover: id });

    handleLeave = () => this.setState({ hover: "" });

    changeMovies = async () => {
        let res = await axios.get(URL + this.state.currPage);

        this.setState({ movies: [...res.data.results] });
    };

    handleNext = () => {
        let tempArr = this.state.parr;
        let newVal = tempArr[tempArr.length - 1] + 1;

        this.setState(
            {
                parr: [...this.state.parr, newVal],
                currPage: this.state.currPage + 1,
            },
            this.changeMovies
        );
    };

    handlePrevious = () => {
        if (this.state.currPage === 1) return;

        this.setState({ currPage: this.state.currPage - 1 }, this.changeMovies);
    };

    handlePageNum = (pageNum) =>
        this.setState({ currPage: pageNum }, this.changeMovies);

    handleFavorites = (movieObj) => {
        let localStorageMovies =
            JSON.parse(localStorage.getItem("movies")) || [];

        if (this.state.favoritesMovies.includes(movieObj.id)) {
            localStorageMovies = localStorageMovies.filter(
                (movie) => movie.id !== movieObj.id
            );
        } else localStorageMovies.push(movieObj);
        console.log(localStorageMovies);

        localStorage.setItem("movies", JSON.stringify(localStorageMovies));

        let tempData = localStorageMovies.map((movieObj) => movieObj.id);
        this.setState({
            favoritesMovies: [...tempData],
        });
    };

    componentDidMount = async () => this.changeMovies();

    render() {
        let movie = this.state.movies;
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
                                            this.handleEnter(movieObj.id)
                                        }
                                        onMouseLeave={this.handleLeave}
                                    >
                                        <img
                                            src={`http://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}
                                            className="card-img-top movies-img"
                                            alt="..."
                                            style={{
                                                height: "25vh",
                                                // width: "20vw",
                                            }}
                                        />

                                        <h5 className="card-title movies-title ">
                                            {movieObj.original_title}
                                        </h5>
                                        <div className="button-wrapper ">
                                            {this.state.hover === movieObj.id &&
                                                (this.state.favoritesMovies.includes(
                                                    movieObj.id
                                                ) ? (
                                                    <div
                                                        className="btn btn-danger movies-button"
                                                        onClick={() =>
                                                            this.handleFavorites(
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
                                                            this.handleFavorites(
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
                                        <a
                                            className="page-link"
                                            onClick={this.handlePrevious}
                                        >
                                            Previous
                                        </a>
                                    </li>

                                    {this.state.parr.map((pageNum) => (
                                        <li className="page-item">
                                            <a
                                                className="page-link"
                                                onClick={() => {
                                                    this.handlePageNum(pageNum);
                                                }}
                                            >
                                                {pageNum}
                                            </a>
                                        </li>
                                    ))}

                                    <li className="page-item">
                                        <a
                                            className="page-link"
                                            onClick={this.handleNext}
                                        >
                                            Next
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                )}
            </>
        );
    }
}
