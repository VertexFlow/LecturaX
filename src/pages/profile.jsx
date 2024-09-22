import React, { useState } from "react";
import "../styles/profile.css";

const Profile = () => {
  return (
    <div className="profile-container">
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
      </main>
    </div>
  );
};

export default Profile;
