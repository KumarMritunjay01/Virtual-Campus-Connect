import React, { useState } from "react";
import { account } from "../utils/appwriteConfig";

function Login({ onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await account.createEmailPasswordSession(email, password);

      const userData = await account.get();

      // Allow login regardless of email verification status
      // (You can optionally log or alert if user is not verified)

      onLogin(userData);
      if (onClose) onClose();
    } catch (error) {
      alert("Login Failed: " + error.message);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
