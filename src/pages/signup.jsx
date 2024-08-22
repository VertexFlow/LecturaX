import React from "react";
import "../styles/login.css"; // Import the CSS file

const Signup = () => {
	return (
		<section className="auth-section">
			<img className="auth-bg" src="/assets/signin.jpg" alt="login" />
			<div className="auth-container">
				<div className="home-link">
					<a href="/" style={{ color: "#000" }}>
						&larr; Back to Home
					</a>
				</div>
				<h1 className="auth-title">Create Your Account</h1>
				<div className="form-wrapper">
					<form method="post" action="/user/signup">
						<div className="form-group">
							<label className="form-label" htmlFor="name">
								Username
							</label>
							<img src="/assets/user.svg" alt="user" className="input-icon" />
							<input
								type="name"
								className="form-control"
								id="name"
								placeholder="username"
								name="name"
								required
							/>
						</div>
						<div className="form-group">
							<label className="form-label" htmlFor="email">
								Email ID
							</label>
							<img
								src="/assets/mail.svg"
								alt="envelope"
								className="input-icon"
							/>
							<input
								type="email"
								className="form-control"
								id="email"
								placeholder="jane@doe.com"
								name="email"
								required
							/>
						</div>
						<div className="form-group">
							<label className="form-label" htmlFor="password">
								Password
							</label>
							<img src="/assets/lock.svg" alt="lock" className="input-icon" />
							<span id="pswd-toggle1">
								<i className="pswd-toggle fas fa-eye-slash"></i>
							</span>
							<input
								type="password"
								className="form-control"
								id="password"
								placeholder="Password"
								name="password"
								required
							/>
						</div>
						<div className="form-group">
							<label className="form-label" htmlFor="password">
								Confirm Password
							</label>
							<img src="/assets/lock.svg" alt="lock" className="input-icon" />
							<span id="pswd-toggle1">
								<i className="pswd-toggle fas fa-eye-slash"></i>
							</span>
							<input
								type="password"
								className="form-control"
								id="password_confirm"
								placeholder="Re-enter your password"
								name="password"
								required
							/>
						</div>
						<button type="submit" className="btn btn-submit">
							Create Account
						</button>
					</form>
					<hr />
					<div className="additional-links">
						<div className="register-link">
							Already have an account?{" "}
							<a href="/user/signin">
								<b>SignIn</b>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Signup;
