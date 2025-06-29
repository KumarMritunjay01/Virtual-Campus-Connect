import React from "react";
import styles from "./About.module.css";

function About() {
  return (
    <div className={styles.aboutContainer}>
      <h2>About Virtual Campus</h2>
      <p>
        Virtual Campus is an unofficial online platform created by students, for
        students. Our goal is to provide a collaborative space where students
        can access resources, share knowledge, and stay connected with the
        academic community. This platform serves as a hub for learning,
        networking, and personal growth.
      </p>

      <h3>Our Vision</h3>
      <p>
        We aim to build an inclusive and supportive environment where students
        can enhance their skills, engage in meaningful discussions, and find
        opportunities for academic and professional development. Virtual Campus
        is designed to foster innovation, creativity, and a sense of community.
      </p>

      <h3>Student-Driven Initiative</h3>
      <p>
        Created and managed by students, Virtual Campus thrives on collaboration
        and peer-to-peer learning. Our team is passionate about making education
        more accessible and engaging by providing relevant content, discussion
        forums, and interactive learning experiences.
      </p>

      <h3>What We Offer</h3>
      <p>
        Our platform features study materials, project collaborations, event
        updates, and networking opportunities. We also encourage students to
        participate in workshops, share their knowledge, and contribute to the
        growing academic ecosystem.
      </p>
    </div>
  );
}

export default About;
