import React, { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../images/logo.jpg";
import { account } from "../../utils/appwriteConfig"; // Import Appwrite config
import Auth from "../../utils/Auth"; // Import the Auth component

function Header() {
  const location = useLocation();
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is logged in when component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDetails = await account.get();
        setUser(userDetails);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    await account.deleteSession("current");
    setUser(null);
    window.location.reload(); // Auto-refresh after logout
  };

  // Handle Login
  const handleLogin = (userData) => {
    setUser(userData);
    setShowAuthPopup(false);
    window.location.reload(); // Auto-refresh after login
  };

  return (
    <>
      <header className={styles.header}>
        <Link to={"/"}>
          {/* <div className={styles.logo}>
            <img src={logo} width={180} height={180} alt="University Logo" />
          </div> */}
          <h2>Virtual-Campus</h2>
        </Link>
        <div className={styles.headercontent}>
          {/* <h1 className={styles.uniName}>Vishal Digital University, Aligarh</h1> */}
          <nav>
            <ul>
              <li>
                <Link
                  to="/"
                  className={location.pathname === "/" ? styles.active : ""}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/notes"
                  className={
                    location.pathname === "/notes" ? styles.active : ""
                  }
                >
                  Notes
                </Link>
              </li>

              <li>
                <Link
                  to="/events"
                  className={
                    location.pathname === "/events" ? styles.active : ""
                  }
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/studentmart"
                  className={
                    location.pathname.startsWith("/stuentmart")
                      ? styles.active
                      : ""
                  }
                >
                  Student Mart
                </Link>
              </li>

              <li>
                <Link
                  to="/chatroom"
                  className={
                    location.pathname === "/chatroom" ? styles.active : ""
                  }
                >
                  Chatroom
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={
                    location.pathname === "/about" ? styles.active : ""
                  }
                >
                  About
                </Link>
              </li>
              {/* Show Login/Signup button OR Logout */}
              <li>
                {user ? (
                  <button className={styles.logoutBtn} onClick={handleLogout}>
                    Logout
                  </button>
                ) : (
                  <button
                    className={styles.signupBtn}
                    onClick={() => setShowAuthPopup(true)}
                  >
                    Sign Up / Login
                  </button>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Right-side Authentication Popup */}
      {showAuthPopup && (
        <div
          className={styles.authOverlay}
          onClick={() => setShowAuthPopup(false)}
        >
          <div
            className={styles.authPopup}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <button
              className={styles.closeBtn}
              onClick={() => setShowAuthPopup(false)}
            >
              ✖
            </button>
            <Auth
              onClose={() => setShowAuthPopup(false)}
              onLogin={handleLogin} // Auto-refresh after login
            />
          </div>
        </div>
      )}
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Header;
