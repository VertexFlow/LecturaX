import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/navbar.css"; // Importing the CSS file

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<nav className="navbar">
				<div className="navbar-container">
					{/* Logo */}
					<div className="navbar-logo">LecturaX</div>

					{/* Hamburger Menu Button for Mobile */}
					<div className="menu-toggle">
						<button onClick={toggleMenu} className="menu-button">
							{isOpen ? (
								<img src="/assets/close.svg" alt="Close" />
							) : (
								<img src="/assets/menu.svg" alt="Menu" />
							)}
						</button>
					</div>

					{/* Navigation Links */}
					<div className={`navbar-links ${isOpen ? "active" : ""}`}>
						<Link to="/" className="nav-link">
							Home
						</Link>
						<Link to="/dashboard" className="nav-link">
							Dashboard
						</Link>
						<Link to="/about" className="nav-link">
							About
						</Link>
						<Link to="/contact" className="nav-link">
							Contact
						</Link>
					</div>

					{/* Login Button */}
					<div className="navbar-login" id="login-btn">
						<Link to="/signin">
							<button className="login-button">SignIn</button>
						</Link>
					</div>
				</div>
			</nav>
			<Outlet />
		</>
	);
};

export default Navbar;
