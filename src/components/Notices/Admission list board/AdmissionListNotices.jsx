import React from "react";
import { useParams } from "react-router-dom";
import PageNotFound from "../../404 error page/404Page";
import styles from "./AdmissionListNotices.module.css";

function AdmissionListNotices() {
  const { notice } = useParams();

  // Date lock logic (10 days after today)
  const today = new Date();
  const releaseDate = new Date();
  releaseDate.setDate(today.getDate() + 10);

  if (today < releaseDate) {
    return (
      <div className={styles.noticeDiv}>
        <h2 className={styles.noticeHeading}>⏳ Content Locked</h2>
        <p>
          This admission notice will be available on{" "}
          <strong>{releaseDate.toDateString()}</strong>. Please check back
          later.
        </p>
      </div>
    );
  }

  // Content display logic
  let noticeContent = null;

  if (notice === "Electrical Engineering Admissions 2026") {
    noticeContent = (
      <div className={styles.noticeDiv}>
        <h2 className={styles.noticeHeading}>
          Electrical Engineering Admissions 2026
        </h2>
        <p>
          For Electrical Engineering admissions at our college, the process
          begins with an entrance examination...
        </p>
      </div>
    );
  }
  // Repeat for other branches as you have done...
  // ...

  if (!noticeContent) {
    return <PageNotFound />;
  }

  return <div>{noticeContent}</div>;
}

export default AdmissionListNotices;
