import React from "react";
import styles from "./AcademicStaff.module.css";
import HodofCS from "./images/Hod-of-Cs-Dhamdhere.png";
import HodofIT from "./images/Hod-of-IT.jpg";
import HodofMc from "./images/Hod-of-mechanical.png";
import HodofCivil from "./images/Hod-of-Civil.png";
import HodofEandTC from "./images/Hod-of-Entc.png";
// import HodofAPS from "./images/Kolgirisir.jpg";
import HodofMba from "./images/HOD-OF-MBA.jpg";
import ExaminationHead from "./images/examination-head-Satav.png";

function AcademicStaff() {
  return (
    <>
      <div className={styles.academicStaff}>
        <h2>Academic Staff Details</h2>
        <p>
          Our college is proud to have a dedicated team of academic staff who
          are experts in their respective fields. They are committed to
          providing quality education and fostering a dynamic learning
          environment.
        </p>

        <h3>Meet Our Professors</h3>
        <ul className={styles.professorsList}>
          <li>
            <img src={HodofCS} alt="Professor 1" />
            <p>Prof.Shrikant Dhamdhere</p>
            <p>Department of Computer Science</p>
          </li>
          <li>
            <img src={HodofIT} alt="Professor 2" />
            <p>Prof. Abidali Shaikh</p>
            <p>Head of Department -IT</p>
          </li>
          <li>
            <img src={HodofMc} alt="Professor 2" />
            <p>Prof. Rajkumar Panchal</p>
            <p>Head of Department -Mechanical </p>
          </li>
          <li>
            <img src={HodofCivil} alt="Professor 2" />
            <p>Prof. Arshi S. Khan</p>
            <p>Head of Department - Civil</p>
          </li>
          <li>
            <img src={HodofEandTC} alt="Professor 2" />
            <p>Prof. Ashwini Patil</p>
            <p>HOD E & TC</p>
          </li>
          {/* <li>
            <img src={HodofAPS} alt="Professor 2" />
            <p>Prof. Tanmay Hon</p>
            <p>Head of First Year Department</p>
          </li> */}

          <li>
            <img src={HodofMba} alt="Professor 2" />
            <p>Prof. Swati Singh</p>
            <p>Head of Department -MBA</p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default AcademicStaff;
