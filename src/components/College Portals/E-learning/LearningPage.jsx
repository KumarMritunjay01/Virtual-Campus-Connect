import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./LearningPage.module.css";
import PageNotFound from "../../404 error page/404Page";

function LearningPage() {
  const { course } = useParams();

  const initialLikes = parseInt(localStorage.getItem(`likes-${course}`)) || 0;
  const initialDislikes =
    parseInt(localStorage.getItem(`dislikes-${course}`)) || 0;

  // Like and Dislike state variables
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);

  useEffect(() => {
    localStorage.setItem(`likes-${course}`, likes.toString());
    localStorage.setItem(`dislikes-${course}`, dislikes.toString());
  }, [likes, dislikes, course]);

  // Define content for each learning content based on 'learningContent'
  let learningContent = null;

  if (course === "Introduction-to-html") {
    learningContent = (
      <div className={styles.LearningPageDiv}>
        <h2>Introduction to html</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          condimentum accumsan mi, non gravida lorem fringilla non.
        </p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/i8AJKNwYetQ?si=pGX4FxeZFL5NIP3r"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    );
  } else if (course === "Advanced-Java") {
    learningContent = (
      <div className={styles.LearningPageDiv}>
        <h2>Advanced Java</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          condimentum accumsan mi, non gravida lorem fringilla non.
        </p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/Ae-r8hsbPUo?si=XYPddo-xH_mFjKAo"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    );
  } else if (course === "Programming-in-C") {
    learningContent = (
      <div className={styles.LearningPageDiv}>
        <h2>Programming in C</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          condimentum accumsan mi, non gravida lorem fringilla non.
        </p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/VSEnzzjAm0c?si=EgRCtsj5L5bV6h4N"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    );
  } else if (course === "Marketing-Management") {
    learningContent = (
      <div className={styles.LearningPageDiv}>
        <h2>Marketing Management</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          condimentum accumsan mi, non gravida lorem fringilla non.
        </p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/cluHtc4Dcew?si=bbjvub8ELGNlnClt"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    );
  } else if (course === "Numerical-Analysis") {
    learningContent = (
      <div className={styles.LearningPageDiv}>
        <h2>Numerical Analysis</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          condimentum accumsan mi, non gravida lorem fringilla non.
        </p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/iviiGB5vxLA?si=NdTnWTWVQPSYQ2Re"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    );
  } else if (course === "Organic-Chemistry") {
    learningContent = (
      <div className={styles.LearningPageDiv}>
        <h2>Organic Chemistry</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          condimentum accumsan mi, non gravida lorem fringilla non.
        </p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/ai6G_7XYgO0?si=gWgxelAoxEKwmAvl"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    );
  } else if (course === "Business-Communication") {
    learningContent = (
      <div className={styles.LearningPageDiv}>
        <h2>Business Communication</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          condimentum accumsan mi, non gravida lorem fringilla non.
        </p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/1gDSCE4SAFg?si=FnwqenEGK1t46Cwp"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    );
  } else if (course === "Multimedia-Technologies") {
    learningContent = (
      <div className={styles.LearningPageDiv}>
        <h2>Multimedia Technologies</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          condimentum accumsan mi, non gravida lorem fringilla non.
        </p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/Syeu_l3sAJE?si=yBROXR08pEAHFKfh"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    );
  } else if (course === "Electrodynamics") {
    learningContent = (
      <div className={styles.LearningPageDiv}>
        <h2>Electrodynamics</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          condimentum accumsan mi, non gravida lorem fringilla non.
        </p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/HM3LDaw-3uM?si=ES8sVqG2fwnlS8LY"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    );
  } else if (course === "Construction-Materials-and-Technology") {
    learningContent = (
      <div className={styles.LearningPageDiv}>
        <h2>Construction Materials and Technology</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          condimentum accumsan mi, non gravida lorem fringilla non.
        </p>

        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/AIrOsmz1HIw?si=iD3D7s2XsnDIzx8C"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    );
  }

  // If 'learningContent' is null, it means the learningContent is not recognized
  if (!learningContent) {
    return <PageNotFound />;
  }

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };
  return (
    <div className={styles.eContent}>
      {learningContent}
      {/* Like and Dislike buttons */}
      <div className={styles.btnContent}>
        <button onClick={handleLike} className={styles.likebtn}>
          Like ({likes})
        </button>
        <button onClick={handleDislike} className={styles.dislikebtn}>
          Dislike ({dislikes})
        </button>
      </div>
    </div>
  );
}

export default LearningPage;
