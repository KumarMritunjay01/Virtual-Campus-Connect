import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FetchItems from "./FetchItems";
import styles from "./Marketplace.module.css";
import { account, databases, storage } from "../../../utils/appwriteConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const Marketplace = () => {
  const [items, setItems] = useState([]);
  const [currentownerId, setCurrentownerId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setCurrentownerId(user.$id);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleFetchSuccess = (fetchedItems) => {
    setItems(fetchedItems);
  };

  const handleDelete = async (itemId, fileId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) return;

    try {
      await databases.deleteDocument(
        "67ecd5140016e131dbbf",
        "67f12b340032733f18be",
        itemId
      );

      if (fileId) {
        try {
          await storage.deleteFile("67f0f8ab000ca7afa904", fileId);
        } catch (fileErr) {
          console.warn(
            "Warning: Could not delete file. It might already be deleted."
          );
        }
      }

      setItems((prev) => prev.filter((item) => item.$id !== itemId));
      alert("Item deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting item: " + error.message);
    }
  };

  const handleEdit = (itemId) => {
    navigate(`/studentmart/marketplace/edit/${itemId}`);
  };

  const handlePayment = (item) => {
    const options = {
      key: "rzp_test_jyJP4xyl5079aJ",
      amount: item.price * 100,
      currency: "INR",
      name: "Student Mart",
      description: item.title,
      image: "https://your-logo-url.com/logo.png",
      handler: function (response) {
        alert(
          "✅ Payment successful!\nPayment ID: " + response.razorpay_payment_id
        );
      },
      prefill: {
        name: "Student Buyer",
        email: "buyer@example.com",
        contact: item.contact,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.marketplaceContainer}>
      <div className={styles.marketplaceHeader}>
        <h2 className={styles.heading}>Marketplace</h2>
        <input
          type="text"
          placeholder="Search products..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className={styles.addItemBtn}
          onClick={() => navigate("/studentmart/marketplace/add-item")}
        >
          Add Item
        </button>
      </div>

      <FetchItems onFetchSuccess={handleFetchSuccess} />

      {filteredItems.length === 0 ? (
        <p className={styles.noItemsText}>No items found</p>
      ) : (
        <div className={styles.itemsGrid}>
          {filteredItems.map((item) => (
            <div key={item.$id} className={styles.itemCard}>
              {item.featured && (
                <div className={styles.featuredTag}>FEATURED</div>
              )}

              <div className={styles.itemTitle}>{item.title}</div>
              <div className={styles.itemImage}>
                <img src={item.image} alt={item.title || "Item"} />
              </div>

              <div className={styles.priceRow}>₹{item.price}</div>

              <div className={styles.itemInfo}>
                <p className={styles.description}>{item.description}</p>
                <p className={styles.contact}>
                  <a href={`tel:${item.contact}`} className={styles.callLink}>
                    📞 {item.contact}
                  </a>
                </p>

                <div className={styles.metaInfo}>
                  <p className={styles.location}>
                    {item.location || "Unknown"}
                  </p>
                  <p className={styles.date}>{item.date || "Today"}</p>
                </div>
              </div>

              <div className={styles.cardBottom}>
                <button
                  className={styles.payButton}
                  onClick={() => handlePayment(item)}
                >
                  Buy Now
                </button>
              </div>

              {item.ownerId === currentownerId && (
                <div className={styles.buttonGroup}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit(item.$id)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(item.$id, item.fileId)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
