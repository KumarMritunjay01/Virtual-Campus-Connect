import { Link } from "react-router-dom";
import styles from "./Notes.module.css"; // For styling

const engineeringBranches = [
  { id: "information-Technology", name: "Information Technology" },
  { id: "computer", name: "Computer Science Engineering" },
  { id: "E&TC", name: "Electronics and Telecommunication" },
  { id: "mechanical", name: "Mechanical Engineering" },
];

function Notes() {
  return (
    <div className={styles.notes}>
      <h2>ENGINEERING NOTES</h2>

      {/* 🚀 Upload Notes Button */}
      <div className={styles.uploadButtonWrapper}>
        <Link to="/upload" className={styles.uploadButton}>
          Upload New Notes
        </Link>
      </div>

      <ul>
        {engineeringBranches.map((branch) => (
          <li key={branch.id}>
            <Link to={`/notes/${branch.id}`}>{branch.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
