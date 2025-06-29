import React from "react";
import { useParams } from "react-router-dom";
import PageNotFound from "../../404 error page/404Page";
import styles from "./Notice&Updates.module.css";

function NoticesAndUpdates() {
  const { notice } = useParams();

  let noticeContent = null;

  if (notice === "Classes for UG-1st semester will commence on June 25th.") {
    noticeContent = (
      <div className={styles.noticeDiv}>
        <h2 className={styles.noticeHeading}>
          Classes for 1st semester will commence on June 25th
        </h2>
        <p>
          The new academic session for first-year undergraduate students will
          officially begin on June 25th. An orientation session will be held on
          June 24th to introduce students to the faculty, course structure, and
          campus facilities. Attendance is mandatory for all students, and class
          schedules will be available on the college website by June 20th.
        </p>
      </div>
    );
  } else if (notice === "Join us for the annual cultural fest on June 15th.") {
    noticeContent = (
      <div className={styles.noticeDiv}>
        <h2 className={styles.noticeHeading}>
          Join us for the annual cultural fest on June 15th.
        </h2>
        <p>
          The much-awaited annual cultural festival will take place on June
          15th, featuring a variety of events such as music, dance, drama, art
          exhibitions, and talent competitions. Students are encouraged to
          participate and showcase their talents. Registrations for individual
          and group events will be open from June 1st to June 10th. For more
          details, visit the cultural committee office or check the college
          website.
        </p>
      </div>
    );
  } else if (
    notice ===
    "Library access is available from 8:00 AM to 6:00 PM on weekdays."
  ) {
    noticeContent = (
      <div className={styles.noticeDiv}>
        <h2 className={styles.noticeHeading}>
          Library access is available from 8:00 AM to 6:00 PM on weekdays.
        </h2>
        <p>
          The college library will remain open from Monday to Friday between
          8:00 AM and 6:00 PM. Students can access academic books, research
          materials, and digital resources during this time. A valid student ID
          card is required for entry. For extended study hours during the exam
          period, students should submit a request to the librarian before June
          20th.
        </p>
      </div>
    );
  } else if (
    notice === "Extension notice for Examination-form last date: June 24th."
  ) {
    noticeContent = (
      <div className={styles.noticeDiv}>
        <h2 className={styles.noticeHeading}>
          Extension notice for Examination-form last date.
        </h2>
        <p>
          The deadline for submitting the Registration-cum-Examination form for
          Four-Year Undergraduate Program (FYUP) students has been extended to
          June 24th. This extension is applicable to both regular and backlog
          students. Late submissions beyond this date will attract a late fee of
          ₹500. The forms are available online on the student portal, and
          payment can be made through digital banking.
        </p>
      </div>
    );
  } else if (
    notice ===
    "Re-evaluation notice for semester examinations is available from June 21st."
  ) {
    noticeContent = (
      <div className={styles.noticeDiv}>
        <h2 className={styles.noticeHeading}>
          Re-evaluation notice for semester examinations
        </h2>
        <p>
          Students who are not satisfied with their semester examination results
          can apply for re-evaluation between June 21st and June 30th. A
          re-evaluation request allows the answer scripts to be rechecked for
          any possible errors in marking. The application fee is ₹800 per
          subject. Results of the re-evaluation process will be declared by July
          10th. Students can apply through the examination section on the
          college website.
        </p>
      </div>
    );
  } else if (notice === "Examination form submission deadline: June 26th.") {
    noticeContent = (
      <div className={styles.noticeDiv}>
        <h2 className={styles.noticeHeading}>
          Examination form for upcoming semester exams
        </h2>
        <p>
          Students appearing for the upcoming semester-end examinations must
          complete the registration process and submit their examination forms
          before the final deadline of June 26th. Examination forms can be
          filled out online, and fees must be paid via the college portal.
          Students failing to submit their forms on time will not be permitted
          to appear for the exams.
        </p>
      </div>
    );
  }

  if (!noticeContent) {
    return <PageNotFound />;
  }

  return <div>{noticeContent}</div>;
}

export default NoticesAndUpdates;
