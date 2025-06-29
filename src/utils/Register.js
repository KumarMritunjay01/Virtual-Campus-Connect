import React, { useState } from "react";
import { account } from "../utils/appwriteConfig";
import { ID } from "appwrite";
import emailjs from "@emailjs/browser";

function Register({ onClose }) {
  const [step, setStep] = useState(1); // Step 1 = Register Form, Step 2 = OTP
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const generateOtp = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  const handleSendOtp = async () => {
    const newOtp = generateOtp();
    setSentOtp(newOtp);
    setStep(2); // Move to OTP input screen

    const currentTime = new Date(Date.now() + 15 * 60000).toLocaleString();

    const templateParams = {
      passcode: newOtp,
      time: currentTime,
      email: email,
    };

    try {
      await emailjs.send(
        "service_edzdqdc", // ✅ Your Service ID
        "template_9x5f92c", // ✅ Your Template ID
        templateParams,
        "aQFQz5P67p9jKb86G" // ✅ Your PUBLIC KEY
      );
      alert("✅ OTP sent to your email.");
    } catch (error) {
      alert("❌ Failed to send OTP: " + error.text);
    }
  };

  const handleVerifyOtpAndRegister = async () => {
    if (otp !== sentOtp) {
      alert("❌ Invalid OTP. Please try again.");
      return;
    }

    setLoading(true);

    try {
      // Create Appwrite user account
      await account.create(ID.unique(), email, password, name);

      alert("✅ Registration successful! Please check your email to verify.");
      // Reset all
      setStep(1);
      setEmail("");
      setPassword("");
      setName("");
      setOtp("");
      if (onClose) onClose();
    } catch (error) {
      alert("❌ Registration failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "400px", margin: "auto" }}>
      <h2>{step === 1 ? "" : "Enter OTP"}</h2>

      {step === 1 ? (
        <>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ display: "block", marginBottom: "10px", width: "100%" }}
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ display: "block", marginBottom: "10px", width: "100%" }}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ display: "block", marginBottom: "10px", width: "100%" }}
          />
          <button
            onClick={handleSendOtp}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Send OTP
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            style={{ display: "block", marginBottom: "10px", width: "100%" }}
          />
          <button
            onClick={handleVerifyOtpAndRegister}
            disabled={loading}
            style={{
              padding: "10px 20px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            {loading ? "Registering..." : "Verify & Register"}
          </button>
        </>
      )}
    </div>
  );
}

export default Register;
