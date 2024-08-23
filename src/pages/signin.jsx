import React, { useRef, useState } from "react";
import "../styles/login.css"; // Import the CSS file

const Signin = () => {
	const icon = useRef();
	const pswdField = useRef();
	const [form, setForm] = useState({ username: "", password: "" });

	const showPassword = () => {
		if (pswdField.current.type === "password") {
			pswdField.current.type = "text";
			icon.current.src = "/assets/show-eye.svg";
		} else {
			pswdField.current.type = "password";
			icon.current.src = "/assets/hide-eye.svg";
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		setForm({
			username: "",
			password: "",
		});

		let res = await fetch("http://localhost:3000/signin", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username: document.getElementById("name").value,
				password: document.getElementById("password").value,
			}),
		});
		let data = await res.text();
		alert(data);
	};

	return (
		<section className="auth-section">
			<img className="auth-bg" src="/assets/signin.jpg" alt="login" />
			<div className="auth-container">
				<div className="home-link">
					<a href="../" style={{ color: "#000" }}>
						&larr; Back to Home
					</a>
				</div>
				<h1 className="auth-title">SignIn</h1>
				<div className="form-wrapper">
					<form method="post" action="/signin">
						<div className="form-group">
							<label className="form-label" htmlFor="username">
								Username
							</label>
							<img src="/assets/user.svg" alt="user" className="input-icon" />
							<input
								type="name"
								className="form-control"
								id="username"
								placeholder="username"
								name="username"
								value={form.username}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="form-group">
							<label className="form-label" htmlFor="password">
								Password
							</label>
							<img src="/assets/lock.svg" alt="lock" className="input-icon" />
							<span onClick={showPassword}>
								<img
									ref={icon}
									src="/assets/hide-eye.svg"
									alt="hidden"
									className="pswd-toggle"
								/>
							</span>
							<input
								ref={pswdField}
								type="password"
								className="form-control"
								id="password"
								placeholder="••••••"
								name="password"
								value={form.password}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="forgot-password-link">
							<a href="/forgot-password">Forgot Password</a>
						</div>
						<button
							type="submit"
							className="btn btn-submit"
							onClick={() => handleLogin}
						>
							Login
						</button>
					</form>
					<hr />
					<div className="additional-links">
						<div className="register-link">
							Don't have an account?{" "}
							<a href="/signup">
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
