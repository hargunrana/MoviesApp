import React, { Component } from "react";
import axios from "axios";
import { genreId } from "./getMovies";
import { API_KEY } from "../secrets";
let URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=`;

export default class Favorites extends Component {
    constructor() {
        super();

        this.state = {
            movies: [],
        };
    }

    async componentDidMount() {
        let res = await axios.get(URL + 1);

        this.setState({ movies: [...res.data.results] });
    }

    render() {
        return (
            <div className="row">
                <div className="col-3" style={{ backgroundColor: "lightblue" }}>
                    <ul className="list-group">
                        <li
                            className="list-group-item active"
                            aria-current="true"
                        >
                            All Genre
                        </li>
                        <li className="list-group-item ">Fantasy</li>
                        <li className="list-group-item ">Action</li>
                        <li className="list-group-item ">Horror</li>
                    </ul>
                </div>
                <div className="col">
                    <div className="row">
                        <input
                            type="text"
                            className="col"
                            placeholder="Search"
                        ></input>
                        <input
                            type="number"
                            className="col"
                            placeholder="5"
                        ></input>
                    </div>

                    <div className="row">
                        <table class="table">
                            <thead>
                                <tr>
                                    {/* <th scope="col">Image</th> */}
                                    <th scope="col">Title</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col">Popularity</th>
                                    <th scope="col">Rating</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.movies.map((movieObj) => (
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
                                                class="btn btn-outline-danger"
                                                style={{ marginRight: "1rem" }}
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
