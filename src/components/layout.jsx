import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/layout.css";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const [username, setUsername] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  useEffect(() => {
    const fetchData = async () => {
      let user = await fetch("/api/dashboard").then((res) =>
        res
          .json()
          .then((data) => setUsername(data.username))
          .catch((err) => console.log(err))
      );
    };

    fetchData();
  }, []);

  const handleSignout = async () => {
    let res = await fetch("/api/signout");
    let data = await res.text();
    if (data === "User signed out") {
      alert(data);
      window.location.href = "/";
    }
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
              <Link to="/dashboard/profile" className="profile-option">
                Edit Profile
              </Link>
              <Link to="/dashboard/profile" className="profile-option">
                Change Password
              </Link>
              <button className="profile-option" onClick={handleSignout}>
                Logout
              </button>
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
                <Link to="/analytics" className="dash-links">
                  My Analytics
                </Link>
              </li>
              <li>
                <Link to="/courses" className="dash-links">
                  Check courses
                </Link>
              </li>
              <li>
                <Link to="/doubt" className="dash-links">
                  Doubt Solving
                </Link>
              </li>
              <li>
                <Link to="/test" className="dash-links">
                  Test & Results
                </Link>
              </li>
              <li>
                <Link to="/timetable" className="dash-links">
                  Time-Table
                </Link>
              </li>
              <li>
                <Link to="/classes" className="dash-links">
                  Live classes
                </Link>
              </li>
              <li>
                <Link to="/support" className="dash-links">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/contact" className="dash-links">
                  Contact
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
