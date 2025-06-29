// src/components/Events/YearEvents.jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { databases, storage, ID, account } from "../../utils/appwriteConfig";
import { Query } from "appwrite";
import styles from "./Events.module.css";

const YearEvents = () => {
  const { year } = useParams();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newFiles, setNewFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await databases.listDocuments(
        "67ecd5140016e131dbbf",
        "67f3dd30002bbe29c798",
        [Query.equal("year", Number(year))]
      );
      setEvents(res.documents);
    };
    fetchEvents();
  }, [year]);

  useEffect(() => {
      const fetchUser = async () => {
        try {
          const userDetails = await account.get();
          setUser(userDetails);
        } catch {
          console.log("User not logged in");
        }
      };
  
      fetchUser();
      // fetchMessages();
      // const interval = setInterval(fetchMessages, 5000);
      // return () => clearInterval(interval);
    }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleBack = () => {
    setSelectedEvent(null);
    setNewFiles([]);
  };

  const handleFileChange = (e) => {
    setNewFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (!selectedEvent) return;
    setUploading(true);
    try {
      const uploadedIds = [];
      for (const file of newFiles) {
        const res = await storage.createFile(
          "67f0b395002c138752a6",
          ID.unique(),
          file
        );
        uploadedIds.push(res.$id);
      }

      const updatedMedia = [...selectedEvent.mediaFiles, ...uploadedIds];

      await databases.updateDocument(
        "67ecd5140016e131dbbf",
        "67f3dd30002bbe29c798",
        selectedEvent.$id,
        {
          mediaFiles: updatedMedia,
        }
      );

      setSelectedEvent({ ...selectedEvent, mediaFiles: updatedMedia });
      setNewFiles([]);
    } catch (error) {
      alert("Upload failed");
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.yearEventsPage}>
      {selectedEvent ? (
        <>
          <h2>{selectedEvent.name}</h2>
          <p>{selectedEvent.description}</p>
          <div className={styles.photoGallery}>
            {selectedEvent.mediaFiles.map((fileId, idx) => (
              <img
                key={idx}
                src={`https://cloud.appwrite.io/v1/storage/buckets/67f0b395002c138752a6/files/${fileId}/view?project=67e42bd1001bc2394907`}
                alt={`Media ${idx}`}
                className={styles.eventImage}
              />
            ))}
          </div>
          { user && <div className={styles.uploadSection}>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*,video/*"
            />
            <button onClick={handleUpload} disabled={uploading}>
              {uploading ? "Uploading..." : "Upload More Photos"}
            </button>
          </div>}
          <button className={styles.backButton} onClick={handleBack}>
            ⬅ Back to Events
          </button>
        </>
      ) : (
        <>
          <h2>Events from {year}</h2>
          <div className={styles.eventGrid}>
            {events.map((event) => (
              <div
                key={event.$id}
                className={styles.eventCard}
                onClick={() => handleEventClick(event)}
              >
                <h3>{event.name}</h3>
                <p>{event.description}</p>
                {event.mediaFiles.length > 0 && (
                  <img
                    src={`https://cloud.appwrite.io/v1/storage/buckets/67f0b395002c138752a6/files/${event.mediaFiles[0]}/view?project=67e42bd1001bc2394907`}
                    alt="Thumbnail"
                    className={styles.eventImage}
                  />
                )}
              </div>
            ))}
          </div>
          <div className={styles.actions}>
            <Link to="/events" className={styles.backButton}>
              ⬅ Back to Years
            </Link>
            {user && (<Link to={`/events/${year}/upload`} className={styles.uploadButton}>
              📤 Upload Event
            </Link> ) }

            {/* <Link to={`/events/${year}/upload`} className={styles.uploadButton}>
              📤 Upload Event
            </Link>  */}
            {}
          </div>
        </>
      )}
    </div>
  );
};

export default YearEvents;
