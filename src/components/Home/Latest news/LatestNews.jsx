import React from "react";
import { useParams } from "react-router-dom";
import PageNotFound from "../../404 error page/404Page";
import styles from "./LatestNews.module.css";

function LatestNews() {
  const { newsName } = useParams();

  // Define content for each news article based on 'newsName'
  let newsContent = null;

  if (newsName === "announcements") {
    newsContent = (
      <div className={styles.newsDiv}>
        <h2 className={styles.newsHeading}>Campus Announcements & Notices</h2>
        <p>
          <strong>Date:</strong> April 6, 2025
        </p>
        <p>
          Stay informed with the latest updates from various departments, exam
          schedules, and administrative announcements on Virtual Campus Connect.
        </p>
      </div>
    );
  } else if (newsName === "events") {
    newsContent = (
      <div className={styles.newsDiv}>
        <h2 className={styles.newsHeading}>
          Student Events & Online Activities
        </h2>
        <p>
          <strong>Date:</strong> April 10, 2025
        </p>
        <p>
          Discover upcoming virtual and on-campus events including cultural
          fests, competitions, and interactive student activities.
        </p>
      </div>
    );
  } else if (newsName === "seminars-workshops") {
    newsContent = (
      <div className={styles.newsDiv}>
        <h2 className={styles.newsHeading}>Seminars, Webinars & Workshops</h2>
        <p>
          <strong>Date:</strong> April 15, 2025
        </p>
        <p>
          Explore various knowledge-sharing sessions conducted by industry
          experts, faculty, and professionals. Stay connected and grow your
          skills.
        </p>
      </div>
    );
  }

  // If 'newsContent' is null, it means the newsName is not recognized
  if (!newsContent) {
    return <PageNotFound />;
  }

  return <div>{newsContent}</div>;
}

export default LatestNews;
