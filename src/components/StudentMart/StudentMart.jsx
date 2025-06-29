import { Link } from "react-router-dom";
import styles from "./StudentMart.module.css"; // For styling

const studentMartSections = [
  { id: "listing", name: "Accommodation Listing" },
  { id: "marketplace", name: "Buy & Sell Use Product" },
  { id: "add-listing", name: "Add New Listing" }, // New route
];

function StudentMart() {
  return (
    <div className={styles.studentMart}>
      <h2>STUDENT MART</h2>
      <ul>
        {studentMartSections.map((section) => (
          <li key={section.id}>
            {/* ✅ Fix: Ensure paths are under "/studentmart/" */}
            <Link to={`/studentmart/${section.id}`}>{section.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentMart;
