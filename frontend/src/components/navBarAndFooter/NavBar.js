import React from "react";
import logo from "../../images/logo.png"

import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="nav-bar">
            <Link to="/" id="navbar-logo">
                <img
                    className="app-logo"
                    src={logo}
                    alt="app-logo"
                />
            </Link>
            <Link to="/" className="link-navbar"><h2>Home</h2></Link>
            <Link to="/menu" className="link-navbar"><h2>Menu</h2></Link>
        </div>
    );
};

export default NavBar
