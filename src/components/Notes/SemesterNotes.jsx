import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchNotes from "./fetchNotes";
import { storage } from "../../utils/appwriteConfig";
import { FaFilePdf, FaDownload, FaEye } from "react-icons/fa";
import styles from "./SemesterNotes.module.css";

const SemesterNotes = () => {
  const { branchId, semesterId } = useParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNotes = async () => {
      setLoading(true);
      const fetchedNotes = await fetchNotes(branchId, Number(semesterId));
      setNotes(fetchedNotes);
      setLoading(false);
    };
    getNotes();
  }, [branchId, semesterId]);

  const getFileUrl = (fileId) => {
    return storage.getFileView("notes_storage", fileId);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        Notes for {branchId} - Semester {semesterId}
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : notes.length > 0 ? (
        <div className={styles.notesGrid}>
          {notes.map((note) => (
            <div key={note.fileId} className={styles.noteCard}>
              <div className={styles.pdfIcon}>
                <FaFilePdf size={50} color="red" />
              </div>
              <div className={styles.noteDetails}>
                <p>
                  <strong>Subject:</strong> {note.subject}
                </p>
                <p>
                  <strong>Unit:</strong> {note.unitName}
                </p>
                <p>
                  <strong>Branch:</strong> {note.branch}
                </p>
                <p>
                  <strong>Semester:</strong> {note.semester}
                </p>
                <p>
                  <strong>Uploaded By:</strong> {note.uploadedBy || "Unknown"}
                </p>
              </div>
              <div className={styles.actions}>
                <a
                  href={getFileUrl(note.fileId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.viewButton}
                >
                  <FaEye /> View
                </a>
                <a
                  href={getFileUrl(note.fileId)}
                  download
                  className={styles.downloadButton}
                >
                  <FaDownload /> Download
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>
          No notes available for {branchId} - Semester {semesterId}.
        </p>
      )}
    </div>
  );
};

export default SemesterNotes;
