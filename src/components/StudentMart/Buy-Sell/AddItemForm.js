import React, { useState, useEffect } from "react";
import { databases, storage, account } from "../../../utils/appwriteConfig";
import styles from "./AddItemForm.module.css";
import { useNavigate } from "react-router-dom";

const AddItemForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [userId, setUserId] = useState(null); // 👈 to store logged-in user's ID

  const navigate = useNavigate();

  // Get the current user on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get(); // get currently logged-in user
        setUserId(user.$id); // save user's ID
      } catch (error) {
        console.log("User not logged in", error);
        alert("You need to be logged in to add an item.");
        navigate("/login"); // redirect if not logged in
      }
    };

    fetchUser();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !price || !contact || !imageFile) {
      alert("Please fill out all fields and upload an image.");
      return;
    }

    try {
      // Upload image to Appwrite Storage
      const uploadedFile = await storage.createFile(
        "67f0f8ab000ca7afa904", // Bucket ID
        "unique()",
        imageFile
      );

      const imageId = uploadedFile.$id; // get uploaded image ID
      const imageUrl = storage
        .getFileView("67f0f8ab000ca7afa904", imageId)
        .toString();

      const postedDate = new Date().toISOString().split("T")[0];

      // Create new document
      await databases.createDocument(
        "67ecd5140016e131dbbf", // Database ID
        "67f12b340032733f18be", // Collection ID
        "unique()",
        {
          title,
          description,
          price: parseFloat(price),
          contact,
          location,
          image: imageUrl,
          imageId, // 👈 store uploaded image ID for future deletion
          date: postedDate,
          ownerId: userId, // 👈 store user ID of the uploader
        }
      );

      alert("Item added successfully!");
      navigate("/studentmart/marketplace");
    } catch (error) {
      alert("Error adding item: " + error.message);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h3 className={styles.heading}>Add Item for Sale</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Item Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
        <textarea
          placeholder="Item Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Contact Info"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={styles.input}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className={styles.input}
        />
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitBtn}>
            Submit Item
          </button>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => navigate("/studentmart/marketplace")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItemForm;
