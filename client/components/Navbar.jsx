import React from "react";
import {Link} from "react-router-dom";

const Navbar = ({filterVisible, setFilterVisible, navigate}) => {
    return (
        <nav className ="navbar bg-body-tertiary">
            <div className="collapse" id="navbarToggleExternalContent" data-bs-theme="dark">
                <div className="bg-dark p-4">
                    <h5 className="text-body-emphasis h4">My Groups</h5>
                    <ul className="list-unstyled">
                        {/* Map through groups here */}
                    </ul>
                </div>
            </div>
            <div className="container-fluid d-flex align-items-center">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarToggleExternalContent"
                    aria-controls="navbarToggleExternalContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link to="/feed" className="navbar-brand">
                    TaskFeed
                </Link>
                
                <form className="d-flex me-auto" role="search">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button className="btn btn-outline-success" type="submit">
                        Search
                    </button>
                </form>
                <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={() => setFilterVisible(!filterVisible)}
                >
                    {filterVisible ? "Hide Filters" : "Show Filters"}
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => navigate("/add")}
                >
                    +
                </button>
            </div>
        </nav>
    );
};

export default Navbar;