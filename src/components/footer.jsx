import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Social Links */}
        <div className="footer-section">
          <h2 className="footer-heading">Let's connect with our socials</h2>
          <div className="social-icons">
            <a href="https://www.instagram.com/" target="_blank">
              <img src="/assets/instagram.svg" alt="Instagram Logo" />
            </a>
            <a href="https://www.linkedin.com/" target="_blank">
              <img src="/assets/linkedin.svg" alt="LinkedIn Logo" />
            </a>
            <a href="https://discord.com/" target="_blank">
              <img src="/assets/discord.svg" alt="Discord Logo" />
            </a>
            <a href="https://x.com/" target="_blank">
              <img src="/assets/twitter.svg" alt="Twitter Logo" />
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div className="footer-section">
          <h3 className="footer-heading">Company</h3>
          <ul className="footer-links">
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Support</a>
            </li>
            <li>
              <a href="./TERMS.pdf" target="_blank">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="./TERMS.pdf" target="_blank">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-section">
          <h3 className="footer-heading">Get in Touch</h3>
          <p className="footer-info">Phone: +918368194042</p>
          <p className="footer-info"> help.lecturax@gmail.com</p>
          <p className="footer-info">
            Galgotias University, Greater Noida, Sec-17A
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          Copyright © 2024 Sorting LecturaX Technologies Pvt Ltd. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
