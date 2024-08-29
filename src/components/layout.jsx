import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/layout.css";

const Layout = ({ username = "Username" }) => {
	const [sidebarOpen, setSidebarOpen] = useState(true);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	return (
		<div className="layout">
			<header>
				<div id="start">
					<div className="hamburger" onClick={toggleSidebar}>
						<span></span>
						<span></span>
						<span></span>
					</div>
					<h1>
						<Link to="/" className="logo">
							LecturaX
						</Link>
					</h1>
				</div>
				<div id="end">
					<div className="profile-dropdown">
						<span>{username}</span>
						<div className="profile-dropdown-content">
							<a href="#">Profile</a>
							<a href="#">Settings</a>
							<a href="#">Logout</a>
						</div>
					</div>
				</div>
			</header>

			<div className="container">
				<aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
					<nav>
						<ul>
							<li>
								<Link to="/dashboard" className="dash-links">
									Dashboard
								</Link>
							</li>
							<li>
								<Link to="/signin" className="dash-links">
									Product
								</Link>
							</li>
							<li>
								<Link to="/signin" className="dash-links">
									UI Elements
								</Link>
							</li>
							<li>
								<Link to="/signin" className="dash-links">
									Pages
								</Link>
							</li>
							<li>
								<Link to="/signin" className="dash-links">
									Forms
								</Link>
							</li>
							<li>
								<Link to="/signin" className="dash-links">
									Graphs
								</Link>
							</li>
							<li>
								<Link to="/signin" className="dash-links">
									Authentication
								</Link>
							</li>
						</ul>
					</nav>
				</aside>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
