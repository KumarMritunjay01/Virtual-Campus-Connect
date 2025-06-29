import React from "react";
import styles from "./Events.module.css";

const EventCard = ({ event }) => {
  return (
    <div className={styles.eventCard}>
      <h4>{event.name}</h4>
      <p>{event.description}</p>
      <div className={styles.mediaGrid}>
        {event.mediaFiles.map((fileId, index) => (
          <img
            key={index}
            src={`https://cloud.appwrite.io/v1/storage/buckets/<your_bucket_id>/files/${fileId}/view?project=<your_project_id>`}
            alt="Event Media"
            className={styles.mediaThumb}
          />
        ))}
      </div>
    </div>
  );
};

export default EventCard;