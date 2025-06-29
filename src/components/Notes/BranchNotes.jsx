import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Notes.module.css";

function BranchNotes() {
  const { branchId } = useParams(); // Get branchId from URL
  const semesters = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <div className={styles.notes}>
      <h2>{branchId.toUpperCase()} - Select Semester</h2>
      <ul>
        {semesters.map((semester) => (
          <li key={semester}>
            <Link to={`/notes/${branchId}/${semester}`}>
              Semester {semester}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/notes">⬅ Back to Branches</Link>
    </div>
  );
}

export default BranchNotes;
