import React from "react";
import { useLocation, useParams } from "react-router-dom";
import styles from "./taskActivity.module.css";
import PageNotFound from "../../404 error page/404Page";

function formatDateTime(dateTime) {
  return new Date(dateTime).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function TaskActivity() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const { activity } = useParams();

  const tasks = {
    "coding-challenge": {
      title: "Coding Challenge",
      question:
        "Build a YouTube-inspired gallery in React using static data, displaying video thumbnails, likes, views, channel names, and channel logos for each video.",
      para1:
        "1. Create a React component that renders a list of videos with static data. You can use an array of objects to represent each video, with properties such as video title, likes, views, channel name, and channel logo URL.",
      para2:
        "2. Each video should be represented by a thumbnail image. Below the thumbnail, there should be text displaying the number of likes and views for that video. You can use CSS to style the layout as needed.",
      para3:
        "3. Display the name of the channel above the thumbnail and the logo of the channel next to it. You can use flexbox or CSS grid to arrange these elements in a visually pleasing way. Ensure that the channel logo is properly sized and displayed next to the channel name.",
    },
    "poetry-contest": {
      title: "Poetry Contest",
      question:
        "Compose and recite an original poem on the theme of 'Nature's Beauty.'",
      para1:
        "1. Create a unique and expressive poem that captures the essence of nature's beauty. You can draw inspiration from the beauty of landscapes, flora, fauna, or any aspect of the natural world.",
      para2:
        "2. Practice your recitation to ensure you convey the emotions and imagery in your poem effectively. Consider the tone, rhythm, and pacing to engage your audience.",
      para3:
        "3. Present your poem during the poetry contest, emphasizing the vivid imagery, metaphors, and emotions in your composition. Make a connection with your audience by engaging them in the beauty of the natural world through your words.",
    },
    "drawing-competition": {
      title: "Drawing Competition",
      question:
        "Create an original artwork that represents the theme 'Dreams and Imagination.'",
      para1:
        "1. Use your artistic skills and creativity to produce a visually captivating artwork that embodies the theme of dreams and imagination. You can use various art mediums such as pencils, paints, or digital tools.",
      para2:
        "2. Pay attention to the details, colors, and composition of your artwork to effectively convey the concept of dreams and imagination. Consider using symbolism or surreal elements to make your piece more intriguing.",
      para3:
        "3. Present your artwork during the drawing competition, explaining the inspiration behind your piece and the techniques you used. Engage with the judges and viewers to help them connect with the world of dreams and imagination you've depicted.",
    },
    "best-introduction": {
      title: "Best Introduction",
      question: "Introduce yourself professionally and impress us with your communication skills. Tell us about your background, interests, and aspirations.",
      para1: "Make your best introduction video and submit the link. You can highlight your educational and professional background to establish your expertise and credibility.",
      para2: "Share your interests and passions to create a personal connection with the audience.",
      para3: "Conclude by discussing your future goals and aspirations to showcase your motivation and vision for the future.",
    },    
    "acting-show": {
      title: "Acting Show",
      question: "Perform a monologue from a famous Shakespearean play.",
      para1:
        "1. Select a monologue from a Shakespearean play that resonates with you and showcases your acting abilities. Consider the character's emotions and motivations within the scene.",
      para2:
        "2. Rehearse and memorize the monologue thoroughly. Pay attention to the nuances of the language and the character's voice, gestures, and body language.",
      para3:
        "3. During the acting show, deliver the monologue with passion and conviction. Aim to transport your audience into the world of Shakespearean drama by bringing the character and the text to life.",
    },
  };

  const selectedTask = tasks[activity];

  if (!selectedTask) {
    // If the selected task doesn't exist in the content object, show an error message.
    return <PageNotFound />;
  }

  return (
    <>
      <div className={styles.mainQuesDiv}>
        <h1>{selectedTask.title}</h1>
        <div className={styles.dateTimeSet}>
          <p>Start Date: {formatDateTime(start)}</p>
          <p>Due Date: {formatDateTime(end)}</p>
        </div>
        <div className={styles.quesDiv}>
          <p className={styles.Question}>{selectedTask.question}</p>
          <p>Max Score: 100</p>
          <p className={styles.bottomLine}></p>
          <p>
            <strong>Details:</strong>
          </p>
          <p>{selectedTask.para1}</p>
          <p>{selectedTask.para2}</p>
          <p>{selectedTask.para3}</p>
          <p className={styles.bottomLine}></p>
          <p>
            <b>Submit Links:</b>
          </p>
          <input
            type="text"
            placeholder="Your name"
            className={styles.quesDivInput}
            required
          />
          <input
            type="text"
            placeholder="Your email"
            className={styles.quesDivInput}
            required
          />
          <input
            type="text"
            placeholder="URL link"
            className={styles.quesDivInput}
            required
          />
          <p>
            <button className={styles.submitLinkBtn}>Submit Links</button>
          </p>
        </div>
      </div>
    </>
  );
}

export default TaskActivity;
