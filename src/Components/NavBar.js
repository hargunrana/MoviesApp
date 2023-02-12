import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NavBar extends Component {
    render() {
        return (
            // <div
            //     style={{
            //         display: "flex",
            //         backgroundColor: "lightblue",
            //         padding: "1rem",
            //         // justifyContent: "center",
            //         alignItems: "center",
            //         color: "blue",
            //     }}
            // >
            //     <h1>Movies App</h1>
            //     <h2 style={{ marginLeft: "2rem", marginTop: "0.5rem" }}>
            //         Favorites
            //     </h2>
            // </div>
            <>
                <nav className="navbar navbar-expand-lg navbar-light nav-bar">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">
                            MoviesApp
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarNav"
                        >
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link
                                        className="nav-link active"
                                        aria-current="page"
                                        to="/"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="favorites">
                                        Favorites
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {/* <div
                    style={{
                        width: "100vw",
                        height: "3.5rem",
                        backgroundColor: "black",
                    }}
                ></div> */}
            </>
        );
    }
}
