import React, { Component } from "react";

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
                        <a className="navbar-brand" href="www">
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
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a
                                        className="nav-link active"
                                        aria-current="page"
                                        href="www"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="www">
                                        Favorites
                                    </a>
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
