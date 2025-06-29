import React from "react";
import { Link } from "react-router-dom";
import styles from "./AdmissionList.module.css";

const notices = [
  { id: 1, text: "E&TC Engineering Admissions 2026" },
  { id: 2, text: "Mechanical Engineering Admissions 2026" },
  { id: 3, text: "Civil Engineering Admissions 2026" },
  { id: 4, text: "Computer , Information Technology Admissions 2026" },
  { id: 5, text: "Electronics & Telecommunication Admissions 2026" },
  { id: 6, text: "General Counseling for All Branches 2026" },
];

function AdmissionNoticeBoard() {
  return (
    <>
      <div className={styles.noticeBoard}>
        <h2 className={styles.noticeheading}>📢 Admission Notices</h2>
        <ul className={styles.noticeList}>
          {notices.map((notice) => (
            <Link key={notice.id} to={`/Admission-list/${notice.text}`}>
              <li key={notice.id} className={styles.noticeItem}>
                {notice.text}
                <span className={styles.badge}>
                  <img
                  // src="http://results.amucontrollerexams.com/result/cons/test.gif"
                  // alt="Smiley face"
                  // height="20"
                  // width="35"
                  />
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}

export default AdmissionNoticeBoard;
