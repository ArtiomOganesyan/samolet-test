import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
export const Navbar = () => {
    return (
        <div className="navbar_menu">
            <Link to="/" className="navbar_text">
                Home
            </Link>
        </div>
    );
};
