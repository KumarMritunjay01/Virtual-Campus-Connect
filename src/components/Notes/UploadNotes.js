import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { account, storage, databases } from "../../utils/appwriteConfig";
import { ID } from "appwrite";
import styles from "./UploadNotes.module.css";

const engineeringBranches = [
  { id: "E&TC", name: "Electronics & Telecommunication" },
  { id: "computer", name: "Computer Science Engineering" },
  { id: "mechanical", name: "Mechanical Engineering" },
  { id: "information-technology", name: "Information Technology" },
];

const semesters = Array.from({ length: 8 }, (_, i) => i + 1);

const UploadNotes = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [unitName, setUnitName] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        setAuthError("⚠️ User is not logged in!");
      }
    };
    checkUser();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!branch || !semester || !subject || !unitName || !file) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      setUploading(true);
      const uploadedFile = await storage.createFile(
        "notes_storage",
        ID.unique(),
        file
      );

      await databases.createDocument(
        "67ecd5140016e131dbbf", // Database ID
        "67ecd524001a882faa68", // Collection ID
        ID.unique(),
        {
          branch,
          semester: parseInt(semester),
          subject,
          unitName,
          fileId: uploadedFile.$id,
          uploadedBy: user.name || user.email, // store uploader info
        }
      );

      alert("✅ File uploaded successfully!");
      setBranch("");
      setSemester("");
      setSubject("");
      setUnitName("");
      setFile(null);
      navigate("/notes");
    } catch (error) {
      console.error("❌ Upload error:", error);
      alert("Something went wrong!");
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    navigate("/notes");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleUpload} className={styles.form}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleCancel}
        >
          &times;
        </button>

        <h2 className={styles.title}>📤 Upload Engineering Notes</h2>

        <label className={styles.label}>Subject Name</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={styles.input}
          placeholder="e.g., Operating System"
          required
        />

        <label className={styles.label}>Unit Name</label>
        <input
          type="text"
          value={unitName}
          onChange={(e) => setUnitName(e.target.value)}
          className={styles.input}
          placeholder="e.g., Process Scheduling"
          required
        />

        <label className={styles.label}>Branch</label>
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className={styles.select}
          required
        >
          <option value="">Select Branch</option>
          {engineeringBranches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>

        <label className={styles.label}>Semester</label>
        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className={styles.select}
          required
        >
          <option value="">Select Semester</option>
          {semesters.map((sem) => (
            <option key={sem} value={sem}>
              Semester {sem}
            </option>
          ))}
        </select>

        <label className={styles.label}>Upload PDF</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className={styles.fileInput}
          required
        />

        <button type="submit" disabled={uploading} className={styles.button}>
          {uploading ? "Uploading..." : "Upload Note"}
        </button>

        {authError && <p className={styles.error}>{authError}</p>}
      </form>
    </div>
  );
};

export default UploadNotes;
