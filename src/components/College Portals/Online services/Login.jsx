import React, { useState } from "react";
import styles from "./Login.module.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulated login logic for library access
    if (username === "vishal" && password === "vishu#developer") {
      alert("Logged in successfully");
      onLogin();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <>
      <h2 style={{color: 'red', marginTop: "40px"}}>Login</h2>
      <div className={styles.loginContainer}>
        <form onSubmit={handleLogin} className={styles.logform}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={styles.loginput}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.loginput}
            />
          </div>
          <button className={styles.logbtn}>
            Login
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </>
  );
}

export default Login;
