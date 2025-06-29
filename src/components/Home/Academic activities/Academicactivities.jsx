import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./AcademicActivities.module.css";
import PageNotFound from "../../404 error page/404Page";

function AcademicActivities() {
  const { activity } = useParams();
  const Navigate = useNavigate();

  // Define content for different academic activities
  const activitiesContent = {
    "research-symposium": {
      title: "Research Symposium",
      description:
        "The Research Symposium is an annual event where students and faculty present their research findings. It provides a platform for intellectual discussions and knowledge sharing.",
      date: "Date: November 15, 2024",
      time: "Time: 9:00 AM",
      mode: "Mode: Offline(Campus Auditorium)",
      image:
        "https://media.istockphoto.com/id/1458682606/photo/students-is-working-with-robot-arm-project.jpg?s=612x612&w=0&k=20&c=Z6zLjEawQkwBKvGGx7A9HO5SbpKpUCuQKDsSQSplZXM=",
      customActivationDateTime: "",
      customEndDateTime: "",
    },
    "entrepreneurship-workshop": {
      title: "Entrepreneurship Workshop",
      description:
        "The Entrepreneurship Workshop is a hands-on program aimed at nurturing students’ entrepreneurial skills. Participants will learn about business ideation, planning, and startup fundamentals.",
      date: "Date: December 5, 2024",
      time: "Time: 10:00 AM",
      mode: "Mode: Offline(Business School Building)",
      image:
        "https://media.istockphoto.com/id/1093925980/photo/successful-happy-group-of-people-learning-software-engineering-and-business-during.jpg?s=612x612&w=0&k=20&c=ic9E7uoMB1FxkpS135aQGcPsvfzlqtWamJuu5DBYNNs=",
      customActivationDateTime: "",
      customEndDateTime: "",
    },
    "drawing-competition": {
      title: "Drawing Competition",
      description:
        'Join our exciting Drawing Competition and showcase your artistic talent. Theme: "Nature\'s Beauty". Prizes to be won!',
      date: "Date: Jan 1, 2025",
      time: "Time: 9:00 AM",
      mode: "Mode: Online",
      image:
        "https://media.istockphoto.com/id/844357070/photo/back-to-school-concept.jpg?s=612x612&w=0&k=20&c=N91gKNVv8ljPNcpx3Aha2m8yct_b8QHdBnuBdqP-ZLY=",
      customActivationDateTime: new Date("2025-01-01T09:00:00"),
      customEndDateTime: new Date("2025-02-01T09:00:00"), // End time is 09:00 AM on 01 feb.
    },
    "best-introduction": {
      title: "Best Introduction",
      description:
        "Learn the skills to make a lasting impression in any setting, from meetings to social events by giving your attractive introduction.",
      date: "Date: September 30, 2024",
      time: "Time: 20:00 PM",
      mode: "Mode: Online",
      image:
        "https://media.istockphoto.com/id/1422817042/vector/diversity-handshake-with-two-businesspeople.jpg?s=612x612&w=0&k=20&c=Rqxr0JC9xk1qBaJm2Vl7ErrC3F-Z5eB1Mx_dVC_YDt8=",
      customActivationDateTime: new Date("2024-09-30T20:00:00"),
      customEndDateTime: new Date("2024-10-30T20:00:00"),
    },
    "coding-challenge": {
      title: "Coding Challenge",
      description:
        "Calling all coders! Join our Coding Challenge and solve real-world problems. Cash prizes for the best solutions!",
      date: "Date: December 10, 2024",
      time: "Time: 21:00 PM",
      mode: "Mode: Online",
      image:
        "https://media.istockphoto.com/id/1262697466/vector/programming-code-icon-3d-low-polygonal-abstract-programming-code-symbol-coding-or-hacker.jpg?s=612x612&w=0&k=20&c=9A8KUPzUHRvyAbIWR7wUzPhXVahBesidXexyqTd71fI=",
      customActivationDateTime: new Date("2024-12-10T21:00:00"),
      customEndDateTime: new Date("2025-03-10T21:00:00"),
    },
    "poetry-contest": {
      title: "Poetry Contest",
      description:
        'Express yourself through poetry in our Poetry Contest. Theme: "Emotions Unveiled". Winners get published in our annual poetry book!',
      date: "Date: Aug 15, 2024",
      time: "Time: 9:00 AM",
      mode: "Mode: Online",
      image:
        "https://media.istockphoto.com/id/1313283994/vector/3d-isometric-flat-vector-conceptual-illustration-of-creative-content-writing.jpg?s=612x612&w=0&k=20&c=mQ4aX12qBxcwK1j9o8BUwYlyJQxWFkb-W-suMfLGqkQ=",
      customActivationDateTime: new Date("2024-08-15T09:00:00"),
      customEndDateTime: new Date("2024-09-15T21:00:00"),
    },
    "acting-show": {
      title: "Acting Show",
      description:
        "Drama enthusiasts, this is your stage! Showcase your acting skills in our Acting Show. Drama scripts provided!",
      date: "Date: July 10, 2024",
      time: "Time: 9:00 AM",
      mode: "Mode: Online",
      image:
        "https://media.istockphoto.com/id/1322032180/vector/children-taking-acting-classes-vector-cartoon-illustration.jpg?s=612x612&w=0&k=20&c=fd98zjT7U4zWPUc0qpU7yy3hCztWnSqpYUdXy51Yg-U=",
      customActivationDateTime: new Date("2024-07-10T09:00:00"),
      customEndDateTime: new Date("2024-08-10T09:00:00"),
    },
  };

  const selectedActivity = activitiesContent[activity];

  if (!selectedActivity) {
    // If the selected activity doesn't exist in the content object, show an error message.
    return <PageNotFound />;
  }

  // Titles that should have a button after the mode paragraph
  const titlesWithButton = [
    "Drawing Competition",
    "Coding Challenge",
    "Poetry Contest",
    "Acting Show",
    "Best Introduction",
  ];

  const customActivationDateTime = selectedActivity.customActivationDateTime;
  const customEndDateTime = selectedActivity.customEndDateTime;
  const currentDateTime = new Date();

  // Check if the current time is within the activation and end times
  const isWithinRange =
    currentDateTime >= customActivationDateTime &&
    currentDateTime <= customEndDateTime;

    // Check if the customActivationDateTime and customEndDateTime are not empty
const hasCustomDateRange = customActivationDateTime && customEndDateTime;

  const handleButtonClick = () => {
    // Navigate to the task activity page when the button is clicked

    Navigate(
      `/academic-activity/${activity}/task?start=${customActivationDateTime.toISOString()}&end=${customEndDateTime.toISOString()}`
    );
  };

  return (
    <div className={styles.activityContainer}>
      <div className={styles.activityImage}>
        <img src={selectedActivity.image} alt={selectedActivity.title} />
      </div>
      <div className={styles.activityDetails}>
        <h2>{selectedActivity.title}</h2>
        <p className={styles.description}>{selectedActivity.description}</p>
        <p>{selectedActivity.date}</p>
        <p>{selectedActivity.time}</p>
        <p>{selectedActivity.mode}</p>
        {titlesWithButton.includes(selectedActivity.title) && (
          <button
            onClick={handleButtonClick}
            className={isWithinRange ? styles.activeTask : styles.inactiveTask}
            disabled={!isWithinRange}
          >
            View Task
          </button>
        )}
        {hasCustomDateRange && !isWithinRange && (
          <div className={styles.taskMessageDiv} style={{ color: currentDateTime > customEndDateTime ? 'red' : 'inherit' }}>
          {currentDateTime > customEndDateTime
            ? "The task that you are approaching has been ended."
            : `Task will be accessible on ${selectedActivity.customActivationDateTime.toLocaleString()}.`}
        </div>
        )}
      </div>
    </div>
  );
}

export default AcademicActivities;
