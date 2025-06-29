import React, { useState, useEffect } from "react";
import { databases, storage, account } from "../../../utils/appwriteConfig";
import { ID, Role, Permission } from "appwrite";
import { useNavigate } from "react-router-dom";
import styles from "./AddListing.module.css";

const databaseId = "67ecd5140016e131dbbf";
const collectionId = "67ee5353003cbe59d7b7";
const bucketId = "67f0f8ab000ca7afa904";

const AddListing = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    ownerContact: "",
    ownerEmail: "",
    createdBy: "",
    detailDescription: "",
    pricePerMonth: "",
    image: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
        setAuthError("");
      } catch (err) {
        setUser(null);
        setAuthError("⚠️ You must be logged in to create a listing.");
      }
    };
    checkAuth();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "ownerContact") {
      const cleanedValue = value.replace(/[^0-9]/g, "");
      if (cleanedValue.length <= 10) {
        setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (formData.ownerContact.length !== 10)
      newErrors.ownerContact = "Please enter a valid 10-digit contact number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setAuthError("⚠️ You must be logged in to create a listing.");
      return;
    }

    if (!validate()) return;

    try {
      let image = "";

      if (formData.image) {
        const fileId = ID.unique();
        const uploadedImage = await storage.createFile(
          bucketId,
          fileId,
          formData.image
        );
        image = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${fileId}/view?project=67e42bd1001bc2394907`;
      }

      await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        {
          ...formData,
          createdAt: new Date().toISOString(),
          pricePerMonth: parseInt(formData.pricePerMonth),
          image,
          userId: user.$id,
        },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );

      alert("✅ Listing added successfully!");
      navigate("/studentmart/listing");
    } catch (err) {
      console.error("Error creating listing:", err);
      alert("Failed to add listing.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Add Listing</h2>
        <button
          className={styles.cancelButton}
          type="button"
          onClick={() => navigate("/studentmart")}
        >
          ✕
        </button>
      </div>

      {authError && <p className={styles.authError}>{authError}</p>}

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Title */}
        <div className={styles.formGroup}>
          <label className={styles.leftAlignLabel}>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter House/Building name"
            value={formData.title}
            onChange={handleChange}
            className={styles.extraWideInput}
            disabled={!user}
          />
          {errors.title && <span className={styles.error}>{errors.title}</span>}
        </div>

        {/* Description */}
        <div className={styles.formGroup}>
          <label className={styles.leftAlignLabel}>Description</label>
          <textarea
            name="description"
            placeholder="Describe facilities like 2BHK, fully furnished..."
            value={formData.description}
            onChange={handleChange}
            className={styles.wideInput}
            rows={4}
            disabled={!user}
          />
          {errors.description && (
            <span className={styles.error}>{errors.description}</span>
          )}
        </div>

        {/* Image Upload */}
        <div className={styles.formGroup}>
          <label className={styles.leftAlignLabel}>Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className={`${styles.imageInput} ${styles.wideInput}`}
            disabled={!user}
          />
        </div>

        {/* Price and Location */}
        <div className={styles.row}>
          <div className={styles.halfGroup}>
            <label className={styles.leftAlignLabel}>Price</label>
            <input
              type="number"
              name="pricePerMonth"
              placeholder="Enter price per month"
              value={formData.pricePerMonth}
              onChange={handleChange}
              className={styles.halfInput}
              disabled={!user}
            />
          </div>
          <div className={styles.halfGroup}>
            <label className={styles.leftAlignLabel}>Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter location"
              value={formData.location}
              onChange={handleChange}
              className={styles.halfInput}
              disabled={!user}
            />
            {errors.location && (
              <span className={styles.error}>{errors.location}</span>
            )}
          </div>
        </div>

        {/* Owner Details */}
        <div className={styles.row}>
          <div className={styles.halfGroup}>
            <label className={styles.leftAlignLabel}>Owner Name</label>
            <input
              type="text"
              name="createdBy"
              placeholder="Enter owner's name"
              value={formData.createdBy}
              onChange={handleChange}
              className={styles.halfInput}
              disabled={!user}
            />
          </div>
          <div className={styles.halfGroup}>
            <label className={styles.leftAlignLabel}>Owner Contact No.</label>
            <div className={styles.phoneInputWrapper}>
              <input
                type="text"
                name="ownerContact"
                placeholder="XXXXXXXXXX"
                className={styles.phoneInput}
                value={formData.ownerContact}
                onChange={handleChange}
                disabled={!user}
              />
            </div>
            {errors.ownerContact && (
              <span className={styles.error}>{errors.ownerContact}</span>
            )}
          </div>
        </div>

        {/* Owner Email */}
        <div className={styles.formGroup}>
          <label className={styles.leftAlignLabel}>Owner Email ID</label>
          <input
            type="email"
            name="ownerEmail"
            placeholder="Enter owner email"
            value={formData.ownerEmail}
            onChange={handleChange}
            className={styles.extraWideInput}
            disabled={!user}
          />
        </div>

        {/* Detail Description */}
        <div className={styles.formGroup}>
          <label className={styles.leftAlignLabel}>Detailed Description</label>
          <textarea
            name="detailDescription"
            placeholder="Write more about your listing..."
            value={formData.detailDescription}
            onChange={handleChange}
            className={styles.wideInput}
            rows={4}
            disabled={!user}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.addButton} disabled={!user}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddListing;
