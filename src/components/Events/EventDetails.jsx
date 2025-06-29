import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { databases, storage, ID,} from "../../utils/appwriteConfig";
import styles from "./Events.module.css";

const EventDetails = () => {
  const { eventId, year } = useParams();
  const [event, setEvent] = useState(null);
  const [newFiles, setNewFiles] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await databases.getDocument(
        "67ecd5140016e131dbbf",
        "67f3dd30002bbe29c798",
        eventId
      );
      setEvent(res);
    };
    fetchEvent();
  }, [eventId]);



  const handleFileChange = (e) => {
    setNewFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    const uploadedIds = [];

    for (const file of newFiles) {
      const uploaded = await storage.createFile(
        "67f0b395002c138752a6",
        ID.unique(),
        file
      );
      uploadedIds.push(uploaded.$id);
    }

    const updatedMedia = [...event.mediaFiles, ...uploadedIds];

    await databases.updateDocument(
      "67ecd5140016e131dbbf",
      "67f3dd30002bbe29c798",
      eventId,
      {
        mediaFiles: updatedMedia,
      }
    );

    setEvent({ ...event, mediaFiles: updatedMedia });
    setNewFiles([]);
    alert("Photos uploaded successfully!");
  };

  return (
    <div className={styles.uploadPage}>
      <h2>
        {event?.name} - {year}
      </h2>
      <p>{event?.description}</p>
      <div className={styles.mediaGrid}>
        {event?.mediaFiles.map((fileId) => (
          <img
            key={fileId}
            src={`https://cloud.appwrite.io/v1/storage/buckets/67f0b395002c138752a6/files/${fileId}/view?project=67e42bd1001bc2394907`}
            alt="event media"
            className={styles.eventImage}
          />
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <input type="file" multiple onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={!newFiles.length}>
          Upload New Photos
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
