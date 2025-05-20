import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
    const links = [
        { name: "Students", link: "/" },
        { name: "Classes", link: "/classes" },
        { name: "Teacher", link: "/teacher" },
        { name: "School", link: "/school" },
    ];
    return (
        <nav className="navbar  navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid px-5">
                <Link className="navbar-brand" to={"/"}>
                    Student Management System
                </Link>
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
                        {links.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.link}
                                className={`nav-link`}
                            >
                                <li className="nav-item">{link.name}</li>
                            </NavLink>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
