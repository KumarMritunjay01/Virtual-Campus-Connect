

import { Link } from "react-router-dom";
import styles from "./Events.module.css";
import { useRef } from "react";

const years = [2025, 2024, 2023];

const demoEvents = [
  {
    title: "TechFest 2024",
    description:
      "Showcasing the latest tech projects, workshops, and competitions for future innovators.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb",
    type: "Tech",
  },
  {
    title: "Cultural Night",
    description:
      "Celebrate diversity with music, dance, theater and art performances.",
    image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4",
    type: "Cultural",
  },
  {
    title: "Hackathon 2025",
    description:
      "48 hours of nonstop coding, collaboration, and creativity.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    type: "Hackathon",
  },
];

const tagColors = {
  Tech: "#0077ff",
  Cultural: "#d63384",
  Hackathon: "#ff6b00",
};

function Events() {
  const yearSectionRef = useRef(null);

  const handleAllEventsClick = () => {
    if (yearSectionRef.current) {
      yearSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.eventsPage}>
      <h1 className={styles.title}>Campus Event Highlights</h1>

      <p className={styles.subtitle}>
        Experience the best moments of campus life — tech, culture, and coding all in one place!
      </p>

      {/* See All Events button */}
      <div className={styles.filterTags}>
        <button
          onClick={handleAllEventsClick}
          className={`${styles.tagButton} ${styles.activeTag}`}
          style={{ borderColor: "#0077ff", color: "#0077ff" }}
        >
          See All Events
        </button>
      </div>

      {/* Event Cards Highlight */}
      <div className={styles.cardsContainer}>
        {demoEvents.map((event, i) => (
          <div
            key={i}
            className={styles.card}
            style={{ borderTopColor: tagColors[event.type], cursor: "pointer" }}
            onClick={handleAllEventsClick}
          >
            <img
              src={event.image}
              alt={event.title}
              className={styles.cardImage}
              loading="lazy"
            />
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{event.title}</h3>
              <p className={styles.cardDesc}>{event.description}</p>
              <span
                className={styles.tag}
                style={{ backgroundColor: tagColors[event.type] }}
              >
                {event.type}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Year-wise Section */}
      <h2 className={styles.yearTitle} ref={yearSectionRef}>
        Explore Events by Year
      </h2>
      <p className={styles.yearDesc}>
        Select a year to dive into the event highlights from that time.
      </p>

      <div className={styles.yearCards}>
        {years.map((year) => (
          <Link
            key={year}
            to={`/events/${year}`}
            className={styles.yearCard}
            style={{ borderColor: "#666" }}
          >
            {year}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Events;
