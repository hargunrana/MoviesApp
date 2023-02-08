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
            genre: [],
            currGenre: "",
        };
    }

    activeFunc = (genre) => {
        this.setState({ currGenre: genre });
    };

    async componentDidMount() {
        let res = await axios.get(URL + 1);

        let genreArr = [];

        res.data.results.map((movieObj) => {
            if (!genreArr.includes(genreId[movieObj.genre_ids[0]])) {
                genreArr.push(genreId[movieObj.genre_ids[0]]);
            } 
        });

        genreArr.unshift("All Genres");
        this.setState({
            movies: [...res.data.results],
            genre: [...genreArr],
            currGenre: "All Genres",
        });
        // console.log(genreArr);
    }

    render() {
        return (
            <div className="row">
                <div className="col-3" style={{ backgroundColor: "lightblue" }}>
                    <ul className="list-group">
                        {this.state.genre.map((genre) => {
                            return this.state.currGenre === genre ? (
                                <li
                                    className="list-group-item active"
                                    aria-current="true"
                                    onClick={() => this.activeFunc(genre)}
                                >
                                    {genre}
                                </li>
                            ) : (
                                <li
                                    className="list-group-item"
                                    aria-current="true"
                                    onClick={() => this.activeFunc(genre)}
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
                                                className="btn btn-outline-danger"
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
