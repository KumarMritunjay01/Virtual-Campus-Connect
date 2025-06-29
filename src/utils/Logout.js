// components/Auth/Logout.js
import React from "react";
import { account } from "../../appwriteConfig";

const Logout = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      onLogout();
      alert("Logged Out!");
    } catch (error) {
      alert(error.message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
