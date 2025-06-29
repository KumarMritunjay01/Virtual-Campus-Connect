import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { databases } from "../../../utils/appwriteConfig";
import styles from "./EditItem.module.css"; // CSS Module import

const EditItem = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await databases.getDocument(
          "67ecd5140016e131dbbf",
          "67f12b340032733f18be",
          itemId
        );
        setItemData(res);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch item:", error);
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Convert price to a float and check if it's a valid number
    const priceValue = parseFloat(itemData.price);

    if (isNaN(priceValue)) {
      alert("❌ Invalid price format! Please enter a valid number.");
      return;
    }

    try {
      const updatedData = {
        title: itemData.title,
        description: itemData.description,
        price: priceValue, // Ensure price is a valid float
        location: itemData.location,
        contact: itemData.contact,
      };

      await databases.updateDocument(
        "67ecd5140016e131dbbf",
        "67f12b340032733f18be",
        itemId,
        updatedData
      );

      alert("✅ Item updated successfully!");
      navigate("/studentmart/marketplace");
    } catch (err) {
      console.error("Update failed:", err);
      alert("❌ Update failed!");
    }
  };

  const handleCancel = () => {
    navigate("/studentmart/marketplace"); // Navigate back to marketplace on cancel
  };

  if (loading) return <p className={styles.loadingText}>Loading item...</p>;

  return (
    <div className={styles.editContainer}>
      <button onClick={handleCancel} className={styles.cancelButton}>
        ×
      </button>{" "}
      {/* Cancel button */}
      <h2 className={styles.editTitle}>Edit Marketplace Item</h2>
      <form onSubmit={handleUpdate} className={styles.editForm}>
        <input
          type="text"
          value={itemData.title}
          onChange={(e) => setItemData({ ...itemData, title: e.target.value })}
          placeholder="Title"
          required
          className={styles.editInput}
        />
        <textarea
          value={itemData.description}
          onChange={(e) =>
            setItemData({ ...itemData, description: e.target.value })
          }
          placeholder="Description"
          required
          className={styles.editTextarea}
        />
        <input
          type="number"
          value={itemData.price}
          onChange={(e) => setItemData({ ...itemData, price: e.target.value })}
          placeholder="Price"
          required
          className={styles.editInput}
        />
        <input
          type="text"
          value={itemData.location}
          onChange={(e) =>
            setItemData({ ...itemData, location: e.target.value })
          }
          placeholder="Location"
          className={styles.editInput}
        />
        <input
          type="text"
          value={itemData.contact}
          onChange={(e) =>
            setItemData({ ...itemData, contact: e.target.value })
          }
          placeholder="Contact"
          className={styles.editInput}
        />

        <button type="submit" className={styles.editButton}>
          Update Item
        </button>
      </form>
    </div>
  );
};

export default EditItem;
