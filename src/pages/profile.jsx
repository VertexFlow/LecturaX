import React, { useState } from "react";
import "../styles/profile.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
	const [activePage, setActivePage] = useState("Profile");

	const handleCancelClick = () => {
		const updateBtn = document.getElementById("update-btn");
		const cancelBtn = document.getElementById("cancel-btn");

		updateBtn.classList.remove("btn-update");
		updateBtn.classList.add("btn-cancel");

		cancelBtn.classList.remove("btn-cancel");
		cancelBtn.classList.add("btn-update");

		setTimeout(() => {
			updateBtn.classList.remove("btn-cancel");
			updateBtn.classList.add("btn-update");

			cancelBtn.classList.remove("btn-update");
			cancelBtn.classList.add("btn-cancel");
		}, 1000);
	};

	return (
		<div className="profile-container">
			<aside className="profile-sidebar">
				<div className="profile-sidebar-header">
					{/* <FontAwesomeIcon icon={faUserCircle} size="10x" /> */}
					<h3 className="profile-heading">LecturaX</h3>
				</div>
				<nav className="profile-sidebar-nav">
					<a
						href="#"
						className={activePage === "Profile" ? "profile-active" : ""}
						onClick={() => setActivePage("Profile")}
					>
						<h3>Account</h3>
					</a>
					<a
						href="#"
						className={activePage === "Password" ? "profile-active" : ""}
						onClick={() => setActivePage("Password")}
					>
						<h3>Password</h3>
					</a>
					<a
						href="#"
						className={activePage === "Dashboard" ? "profile-active" : ""}
						onClick={() => setActivePage("Dashboard")}
					>
						<h3>Back To Dashboard</h3>
					</a>
				</nav>
			</aside>

			<main className="profile-main-content">
				<h2>Account Settings</h2>
				<div className="profile-flex-items">
					<div className="profile-flex-item">
						<h3>First Name</h3>
						<input type="text" name="first-name" />
						<h3>School</h3>
						<input type="text" name="School" />
						<h3>Phone No.</h3>
						<input type="text" name="Phone Number" />
						<h3>Class and Section</h3>
						<input type="text" name="Class and Section" />
					</div>
					<div className="profile-flex-item">
						<h3>Last Name</h3>
						<input type="text" name="Last Name" />
						<h3>Address</h3>
						<input type="text" name="Address" />
						<h3>Email</h3>
						<input type="text" name="Email" />
						<h3>Address</h3>
						<input type="text" name="Address" />
					</div>
				</div>
				<div className="profile-buttons">
					<button
						type="button"
						id="update-btn"
						className="btn-update"
						onClick={handleCancelClick}
					>
						Update
					</button>
					<button
						type="button"
						id="cancel-btn"
						className="btn-cancel"
						onClick={handleCancelClick}
					>
						Cancel
					</button>
				</div>
			</main>
		</div>
	);
};

export default Profile;
