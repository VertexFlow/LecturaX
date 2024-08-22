import React, { useState } from "react";
import "../styles/navbar.css"; // Importing the CSS file

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
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
					<a href="/" className="nav-link">
						Home
					</a>
					<a href="/about" className="nav-link">
						About
					</a>
					<a href="/dashboard" className="nav-link">
						Dashboard
					</a>
					<a href="/contact" className="nav-link">
						Contact
					</a>

					{/* Login Button */}
					<div className="navbar-login">
						<button className="login-button">Login</button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
