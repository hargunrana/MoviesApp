import React, { Component } from "react";
import { movies } from "./getMovies";
export default class List extends Component {
    constructor() {
        super();
        this.state = {
            hover: "",
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

    render() {
        let movie = movies.results;
        // let movie = [];
        return (
            <>
                {movie.length === 0 ? (
                    <div class="spinner-grow text-danger" role="status">
                        <span class="visually-hidden">Loading...</span>
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
                                <ul class="pagination">
                                    <li class="page-item">
                                        <a class="page-link" href="#">
                                            Previous
                                        </a>
                                    </li>
                                    <li class="page-item">
                                        <a class="page-link" href="#">
                                            1
                                        </a>
                                    </li>
                                    <li class="page-item">
                                        <a class="page-link" href="#">
                                            2
                                        </a>
                                    </li>
                                    <li class="page-item">
                                        <a class="page-link" href="#">
                                            3
                                        </a>
                                    </li>
                                    <li class="page-item">
                                        <a class="page-link" href="#">
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
