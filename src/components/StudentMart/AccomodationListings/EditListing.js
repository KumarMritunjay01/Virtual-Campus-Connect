import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { databases, storage } from "../../../utils/appwriteConfig";
import { ID } from "appwrite";

const DATABASE_ID = "67ecd5140016e131dbbf";
const COLLECTION_ID = "67ee5353003cbe59d7b7";
const BUCKET_ID = "67f0f8ab000ca7afa904"; // ✅ Replace with your actual bucket ID

function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pricePerMonth: "",
    ownerContact: "",
    ownerEmail: "",
    location: "",
    fileId: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await databases.getDocument(
          DATABASE_ID,
          COLLECTION_ID,
          id
        );

        setFormData({
          title: response.title || "",
          description: response.description || "",
          pricePerMonth: response.pricePerMonth || "",
          ownerContact: response.ownerContact || "",
          ownerEmail: response.ownerEmail || "",
          location: response.location || "",
          fileId: response.fileId || "",
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching listing:", error);
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      let updatedData = {
        title: formData.title,
        description: formData.description,
        pricePerMonth: formData.pricePerMonth,
        ownerContact: formData.ownerContact,
        ownerEmail: formData.ownerEmail,
        location: formData.location,
      };

      // If new file selected, upload it
      if (file) {
        const uploadResponse = await storage.createFile(
          BUCKET_ID,
          ID.unique(),
          file
        );
        updatedData.fileId = uploadResponse.$id; // Add fileId only if a new file is uploaded
      }

      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id,
        updatedData
      );

      alert("Listing updated!");
      navigate("/studentmart/listing");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update listing.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Edit Listing</h2>
      {loading ? (
        <p>Loading listing...</p>
      ) : (
        <form onSubmit={handleUpdate}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              required
            />
          </label>
          <br />
          <br />
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              rows={5}
              required
            />
          </label>
          <br />
          <br />
          <label>
            Price per Month:
            <input
              type="number"
              name="pricePerMonth"
              value={formData.pricePerMonth}
              onChange={handleChange}
              placeholder="Price per month"
              required
            />
          </label>
          <br />
          <br />
          <label>
            Contact Number:
            <input
              type="text"
              name="ownerContact"
              value={formData.ownerContact}
              onChange={handleChange}
              placeholder="Owner Contact"
            />
          </label>
          <br />
          <br />
          <label>
            Email:
            <input
              type="email"
              name="ownerEmail"
              value={formData.ownerEmail}
              onChange={handleChange}
              placeholder="Owner Email"
            />
          </label>
          <br />
          <br />
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
            />
          </label>
          <br />
          <br />
          <label>
            Upload New File (optional):
            <input type="file" onChange={handleFileChange} />
          </label>
          <br />
          <br />
          <button type="submit">Update Listing</button>
        </form>
      )}
    </div>
  );
}

export default EditListing;
