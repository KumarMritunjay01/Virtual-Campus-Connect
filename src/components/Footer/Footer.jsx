import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h3 className={styles.title}>Contact Us</h3>
          <p className={styles.contactInfo}>Email: kmritunjay525@gmail.com</p>
          <p className={styles.contactInfo}>
            Website: Virtual-campus-connect For e-Learning.com
          </p>
          <p className={styles.contactInfo}>Phone: +91 7079661695</p>
        </div>
        <div className={styles.column}>
          <h3 className={styles.title}>Quick Links</h3>
          <ul className={styles.linkList}>
            <li>
              <a className={styles.link} href="/">
                Home
              </a>
            </li>
            <li>
              <a className={styles.link} href="/notes">
                Notes
              </a>
            </li>
            <li>
              <a className={styles.link} href="/chatroom">
                Chatroom
              </a>
            </li>
            <li>
              <a className={styles.link} href="/about">
                About
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.column}>
          <h3 className={styles.title}>Follow Us</h3>
          <div className={styles.socialLinks}>
            <a
              className={styles.socialIcon}
              href="https://github.com/KumarMritunjay01"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              className={styles.socialIcon}
              href="https://codepen.io/Mirtunjay-Kumar-the-sans"
            >
              <i className="fa-brands fa-codepen"></i>
            </a>
            <a
              className={styles.socialIcon}
              href="https://www.linkedin.com/in/mritunjay-kumar-92ba97256/"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
          <Link to={"/share_your_feedback"}>
            <div className={styles.feedbackDiv}>Share your feedback</div>
          </Link>
        </div>
      </div>
      <p className={styles.creator}>
        &copy; All rights reserved 2025, Campus-connect
      </p>
    </footer>
  );
}

export default Footer;
