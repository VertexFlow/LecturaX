import React from "react";
import "../styles/dashboard.css";

function Dashboard() {
	return (
		<>
			<main className="main-content">
				<div className="grid-container">
					<div className="card earnings-report">My Analytics</div>
					<div className="card google-drive">Check Courses</div>
					<div className="card subscribers">Notifications</div>
					<div className="card loan-balance">Doubt Solving</div>
					<div className="card news-update">Tests and Results</div>
					<div className="card monthly-orders">Contact</div>
					<div className="card progress-tracker">Time-Table</div>
					<div className="card members">Live Classes</div>
					<div className="card reward-bonus">Support</div>
				</div>
			</main>
		</>
	);
}

export default Dashboard;
