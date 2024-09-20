import React, { useRef, useState } from "react";
import "../styles/login.css";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const icon = useRef();
  const icon_c = useRef();
  const pswdField = useRef();
  const pswdField_c = useRef();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    c_password: "",
  });
  const [role, setRole] = useState("student");

  function showPassword(icon, pswd) {
    if (pswd.current.type === "password") {
      pswd.current.type = "text";
      icon.current.src = "/assets/show-eye.svg";
    } else {
      pswd.current.type = "password";
      icon.current.src = "/assets/hide-eye.svg";
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setForm({
      username: "",
      email: "",
      password: "",
      c_password: "",
    });

    if (form.password !== form.c_password) {
      alert("Passwords do not match");
      return;
    }
    try {
      let res = await axios.post("/api/signup", {
        ...form,
        role,
        id: uuidv4(),
      });
      alert(res.data);
      if (res.status === 200) window.location.href = "/dashboard";
      if (res.status === 401) window.location.href = "/signin";
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-container">
        <h1 className="auth-title">Create Your Account</h1>
        <div className="form-wrapper">
          <form method="post" action="/signup">
            <div className="role-container">
              <div className="tabs">
                <input
                  type="radio"
                  id="student"
                  name="tabs"
                  value={"student"}
                  checked={role === "student"}
                  onChange={handleRoleChange}
                />
                <label className="tab" htmlFor="student">
                  Student
                </label>
                <input
                  type="radio"
                  id="teacher"
                  name="tabs"
                  value={"teacher"}
                  checked={role === "teacher"}
                  onChange={handleRoleChange}
                />
                <label className="tab" htmlFor="teacher">
                  Teacher
                </label>
                <span className="glider"></span>
              </div>
            </div>
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
                required={true}
                onChange={handleChange}
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
                value={form.email}
                required={true}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <img src="/assets/lock.svg" alt="lock" className="input-icon" />
              <span onClick={() => showPassword(icon, pswdField)}>
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
                placeholder="Password"
                name="password"
                value={form.password}
                required={true}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="c_password">
                Confirm Password
              </label>
              <img src="/assets/lock.svg" alt="lock" className="input-icon" />
              <span onClick={() => showPassword(icon_c, pswdField_c)}>
                <img
                  ref={icon_c}
                  src="/assets/hide-eye.svg"
                  alt="hidden"
                  className="pswd-toggle"
                />
              </span>
              <input
                ref={pswdField_c}
                type="password"
                className="form-control"
                id="password_confirm"
                placeholder="Re-enter your password"
                name="c_password"
                value={form.c_password}
                required={true}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-submit"
              onClick={handleSubmit}
            >
              Create Account
            </button>
          </form>
          <hr />
          <div className="additional-links">
            <div className="register-link">
              Already have an account?{" "}
              <Link to="/signin" className="redirect-links">
                <b>SignIn</b>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
