import React, { Component } from "react";
import { movies } from "./getMovies";
import axios from "axios";
import { API_KEY } from "../secrets";
export default class List extends Component {
    constructor() {
        super();
        this.state = {
            hover: "",
            parr: [1],
            currPage: 1,
            movies: [],
        };
    }

    handleEnter = (id) => {
        this.setState({
            hover: id,
        });
    };

    handleLeave = () => {
        this.setState({
            hover: "",
        });
    };

    async componentDidMount() {
        let res = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currPage}`
        );
        // console.log(res.data);
        this.setState({
            movies:[...res.data.results]
        })
    }

    render() {
        // let movie = movies.results;
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
                                                height: "40vh",
                                            }}
                                        />

                                        <h5 className="card-title movies-title ">
                                            {movieObj.original_title}
                                        </h5>
                                        <div className="button-wrapper ">
                                            {this.state.hover ===
                                                movieObj.id && (
                                                <a
                                                    href="www.google.com"
                                                    className="btn btn-primary movies-button"
                                                >
                                                    Add to Favourites
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="pagination">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a className="page-link" href="#">
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
                                        <a className="page-link" href="#">
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
