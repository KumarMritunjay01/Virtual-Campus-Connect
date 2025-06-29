import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import styles from "./Auth.module.css";

function Auth({ onClose, onLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.authContainer}>
      <div
        className={`${styles.formWrapper} ${
          isLogin ? styles.slideInLeft : styles.slideInRight
        }`}
      >
        <h2 className={styles.title}>{isLogin ? "Login" : "Register"}</h2>

        {isLogin ? (
          <Login onClose={onClose} onLogin={onLogin} />
        ) : (
          <Register onClose={onClose} onRegister={onLogin} />
        )}

        <div className={styles.toggle}>
          {isLogin ? (
            <p>
              Don't have an account?{" "}
              <button className={styles.link} onClick={() => setIsLogin(false)}>
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button className={styles.link} onClick={() => setIsLogin(true)}>
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
