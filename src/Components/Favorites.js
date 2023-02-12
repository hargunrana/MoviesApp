import React, { Component } from "react";
// import axios from "axios";
import { genreId } from "./getMovies";
// import { API_KEY } from "../secrets";
// let URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=`;

export default class Favorites extends Component {
    constructor() {
        super();

        this.state = {
            movies: [],
            genre: [],
            currGenre: "",
            currText: "",
        };
    }

    handleCurrGenre = (genre) => {
        this.setState({ currGenre: genre });
    };
    handleText = (e) => {
        this.setState({ currText: e.target.value });
    };

    handleDelete = (movie) => {
        let newMovies = this.state.movies.filter(
            (movieObj) => movie.id !== movieObj.id
        );
        this.setState({
            movies: [...newMovies],
        });
        localStorage.setItem("movies", JSON.stringify(newMovies));
    };
    async componentDidMount() {
        // let res = await axios.get(URL + 1);
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

        if (this.state.currText !== "") {
            filteredMovies = this.state.movies.filter((movieObj) => {
                let movieName = movieObj.original_title.toLowerCase();
                return movieName.includes(this.state.currText);
            });
        }

        if (this.state.currGenre !== "All Genres") {
            filteredMovies = this.state.movies.filter(
                (movieObj) =>
                    genreId[movieObj.genre_ids[0]] === this.state.currGenre
            );
        }

        return (
            <div className="row">
                <div className="col-3" style={{ backgroundColor: "lightblue" }}>
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
                                        <i class="fa-solid fa-caret-up" />
                                        Popularity
                                        <i class="fa-solid fa-caret-down" />
                                    </th>
                                    <th scope="col">Rating</th>
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
            </div>
        );
    }
}
