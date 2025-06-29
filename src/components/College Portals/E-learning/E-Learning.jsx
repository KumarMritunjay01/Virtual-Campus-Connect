import React from "react";
import { Link } from "react-router-dom";
import styles from "./E-Learning.module.css";

function ELearning() {
  return (
    <>
      <div className={styles.eLearning}>
        <h2>E-Learning Platform</h2>
        <p>
          Welcome to our E-Learning platform! We provide a wide range of online
          and resources to support your learning journey. Explore our offerings
          and enhance your knowledge.
        </p>

        <h3>Available Courses</h3>
        <ul className={styles.coursesList}>
          <li>
            <Link to={"https://www.youtube.com/watch?v=k7ELO356Npo"}>
              Course 1: Introduction to html
            </Link>
          </li>
          <li>
            <Link to={"https://www.youtube.com/watch?v=ESnrn1kAD4E"}>
              Course 2: Introduction to CSS
            </Link>
          </li>
          <li>
            <Link
              to={
                "https://www.youtube.com/watch?v=ajdRvxDWH4w&list=PLGjplNEQ1it_oTvuLRNqXfz_v_0pq6unW"
              }
            >
              Course 3: Introduction to JavaScripts
            </Link>
          </li>
          <li>
            <Link
              to={
                "https://www.youtube.com/watch?v=vz1RlUyrc3w&list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige"
              }
            >
              Course 4: Introduction to React
            </Link>
          </li>
          <li>
            <Link to={"https://www.youtube.com/watch?v=CFD9EFcNZTQ"}>
              Course 5: Introduction Core Java
            </Link>
          </li>
          <li>
            <Link to={"https://www.youtube.com/watch?v=Ae-r8hsbPUo&t=5632s"}>
              Course 6: Complete Advanced Java
            </Link>
          </li>
          <li>
            <Link
              to={
                "https://www.youtube.com/watch?v=rQoqCP7LX60&list=PLxgZQoSe9cg1drBnejUaDD9GEJBGQ5hMt"
              }
            >
              Course 7: Programming in C
            </Link>
          </li>
          <li>
            <Link to={"https://www.youtube.com/watch?v=e7sAf4SbS_g"}>
              Course 8: Programming in C++
            </Link>
          </li>
          <li>
            <Link
              to={
                "https://www.youtube.com/watch?v=t2_Q2BRzeEE&list=PLGjplNEQ1it8-0CmoljS5yeV-GlKSUEt0"
              }
            >
              Course 9: Programming in python
            </Link>
          </li>
        </ul>
        <div className={styles.quizDiv}>
          <a href="https://playquizwithvishal.netlify.app/" target="_blank">
            <button className={styles.quizBtn}>Play Quiz</button>
          </a>
        </div>
      </div>
    </>
  );
}

export default ELearning;
