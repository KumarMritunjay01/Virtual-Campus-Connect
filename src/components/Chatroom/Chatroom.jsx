import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { databases, account } from "../../utils/appwriteConfig";
import { ID, Query } from "appwrite";
import styles from "./Chatroom.module.css";

const Chatroom = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const collectionId = "67f36268001c414c93f7";
  const databaseId = "67ecd5140016e131dbbf";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDetails = await account.get();
        setUser(userDetails);
      } catch {
        console.log("User not logged in");
      }
    };

    fetchUser();
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await databases.listDocuments(databaseId, collectionId, [
        Query.orderDesc("$createdAt"),
        Query.limit(50),
      ]);
      setMessages(response.documents.reverse());
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const openRazorpay = (userEmail) => {
    const msgKey = `msg_count_${userEmail}`;
    const paidKey = `paid_status_${userEmail}`;

    const options = {
      key: "rzp_test_jyJP4xyl5079aJ", // Replace with your Razorpay key
      amount: 1000, // ₹10 in paise
      currency: "INR",
      name: "Virtual Campus Connect",
      description: "Pay ₹10 to send 2 more messages",
      handler: function () {
        alert("Payment successful! You can now send 2 more messages.");
        localStorage.setItem(paidKey, "true");
        localStorage.setItem(msgKey, "0");
      },
      prefill: {
        email: userEmail,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const sendMessage = async () => {
    if (!message.trim() || !user) return;

    const userEmail = user.email;
    const msgKey = `msg_count_${userEmail}`;
    const paidKey = `paid_status_${userEmail}`;
    let msgCount = parseInt(localStorage.getItem(msgKey) || "0");
    const hasPaid = localStorage.getItem(paidKey) === "true";

    // First 2 messages free for every user
    if (msgCount >= 2) {
      if (!hasPaid) {
        alert("You’ve used your 2 free messages. Please pay ₹10 to continue.");
        openRazorpay(userEmail);
        return;
      } else {
        // Already paid, but again 2 messages used — ask to pay again
        alert("You've used 2 paid messages. Please pay ₹10 again to continue.");
        localStorage.setItem(paidKey, "false"); // reset paid status
        openRazorpay(userEmail);
        return;
      }
    }

    try {
      await databases.createDocument(databaseId, collectionId, ID.unique(), {
        user: userEmail,
        text: message,
        timestamp: new Date().toISOString(),
      });

      msgCount++;
      localStorage.setItem(msgKey, msgCount.toString());
      setMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error.message, error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className={styles.chatOverlay}>
      <div className={styles.chatPopup}>
        <button className={styles.closeBtn} onClick={() => navigate("/")}>
          ×
        </button>
        <h2 className={styles.header}>Chatroom</h2>
        <div className={styles.chatMessages}>
          {messages.length === 0 ? (
            <p className={styles.emptyChat}>
              No messages yet. Start the conversation!
            </p>
          ) : (
            messages.map((msg) => (
              <div key={msg.$id} className={styles.chatMessageWrapper}>
                <div className={styles.sender}>{msg.user}</div>
                <div className={styles.chatMessage}>{msg.text}</div>
              </div>
            ))
          )}
          <div ref={messagesEndRef}></div>
        </div>
        {user ? (
          <div className={styles.chatInput}>
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        ) : (
          <p className={styles.loginMsg}>Please log in to send messages.</p>
        )}
      </div>
    </div>
  );
};

export default Chatroom;
