import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/layout.css";

const Layout = ({ username = "Username" }) => {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [dropdown, setDropdown] = useState(false);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	const toggleDropdown = () => {
		setDropdown(!dropdown);
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
					<Link to="/" className="logo">
						LecturaX
					</Link>
				</div>
				<div id="end">
					<img src="/assets/notification.svg" alt="Bell Icon" />
					<div className="profile-dropdown" onClick={toggleDropdown}>
						<span>{username}</span>
						<div className={`profile-menu ${dropdown ? "expand" : ""}`}>
							<Link to="/dashboard/profile" className="profile-option">
								View Profile
							</Link>
							<Link to="/" className="profile-option">
								Edit Profile
							</Link>
							<Link to="/" className="profile-option">
								Change Password
							</Link>
							<Link to="/" className="profile-option">
								Logout
							</Link>
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
