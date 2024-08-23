import React from "react";
import "../styles/login.css"; // Import the CSS file

const Signin = () => {
	return (
		<section className="auth-section">
			<img className="auth-bg" src="/assets/signin.jpg" alt="login" />
			<div className="auth-container">
				<div className="home-link">
					<a href="/" style={{ color: "#000" }}>
						&larr; Back to Home
					</a>
				</div>
				<h1 className="auth-title">SignIn</h1>
				<div className="form-wrapper">
					<form method="post" action="/user/signin">
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
								placeholder="••••••"
								name="password"
								required
							/>
						</div>
						<div className="forgot-password-link">
							<a href="/forgot-password">Forgot Password</a>
						</div>
						<button type="submit" className="btn btn-submit">
							Login
						</button>
					</form>
					<hr />
					<div className="additional-links">
						<div className="register-link">
							Don't have an account?{" "}
							<a href="/user/signup">
								<b>SignUp</b>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Signin;
