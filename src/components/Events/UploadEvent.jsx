// src/components/Events/UploadEvent.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import uploadEvent from "./uploadEvent";
import styles from "./Events.module.css";

const UploadEvent = () => {
  const { year } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", description: "", mediaFiles: [] });
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "mediaFiles") {
      setFormData({ ...formData, mediaFiles: Array.from(e.target.files) });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      await uploadEvent({ ...formData, year: Number(year) });
      navigate(`/events/${year}`);
    } catch (error) {
      console.log(error);
      alert("Failed to upload event.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.uploadPage}>
      <h2>Upload Event for {year}</h2>
      <form className={styles.uploadForm} onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Event Title" required onChange={handleChange} />
        <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
        <input type="file" name="mediaFiles" multiple required onChange={handleChange} accept="image/*,video/*" />
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Event"}
        </button>
      </form>
    </div>
  );
};

export default UploadEvent;
