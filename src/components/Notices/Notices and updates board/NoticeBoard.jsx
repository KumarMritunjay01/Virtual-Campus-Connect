import React from "react";
import { Link } from "react-router-dom";
import styles from "./NoticeBoard.module.css";

const notices = [
  {
    id: 1,
    text: "Classes for UG-1st semester will commence on June 25th.",
  },
  {
    id: 2,
    text: "Join us for the annual cultural fest on June 15th.",
  },
  {
    id: 3,
    text: "Library access is available from 8:00 AM to 6:00 PM on weekdays.",
  },
  {
    id: 4,
    text: "Extension notice for Examination-form last date: June 24th.",
  },
  {
    id: 5,
    text: "Re-evaluation notice for semester examinations is available from June 21st.",
  },
  {
    id: 6,
    text: "Examination form submission deadline: June 26th.",
  },
];

function NoticeBoard() {
  return (
    <>
      <div className={styles.noticeBoard}>
        <h2 className={styles.noticeheading}>📢 Notices & updates</h2>
        <ul className={styles.noticeList}>
          {notices.map((notice) => (
            <Link key={notice.id} to={`/notices-and-updates/${notice.text}`}>
              <li key={notice.id} className={styles.noticeItem}>
                {notice.text}
                <span className={styles.badge}>
                  {/* <img
                    // src="http://results.amucontrollerexams.com/result/cons/test.gif"
                    alt="Smiley face"
                    height="20"
                    width="35"
                  /> */}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}

export default NoticeBoard;
