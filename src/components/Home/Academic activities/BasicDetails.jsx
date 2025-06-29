import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./BasicDetails.module.css";
import Campus from "../Campus/Campus.module.css";
import admitprocess from "../Admission process/AdmissionProcess.module.css";
import FAQ from "../Admission process/FAQ";
import PageNotFound from "../../404 error page/404Page";

function BasicDetails() {
  const { detail } = useParams();

  let detailContent = null;
  const academicActivities = [
    {
      id: 1,
      title: "Research Symposium",
      description:
        "Our annual Research Symposium provides a platform for students and faculty to present their research findings.",
      imageUrl:
        "https://media.istockphoto.com/id/1458682606/photo/students-is-working-with-robot-arm-project.jpg?s=612x612&w=0&k=20&c=Z6zLjEawQkwBKvGGx7A9HO5SbpKpUCuQKDsSQSplZXM=",
      route: "/academic-activity/research-symposium", // Dynamic route
    },
    {
      id: 2,
      title: "Entrepreneurship Workshop",
      description:
        "Join our Entrepreneurship Workshop to learn about starting your own business and innovation.",
      imageUrl:
        "https://media.istockphoto.com/id/1093925980/photo/successful-happy-group-of-people-learning-software-engineering-and-business-during.jpg?s=612x612&w=0&k=20&c=ic9E7uoMB1FxkpS135aQGcPsvfzlqtWamJuu5DBYNNs=",
      route: "/academic-activity/entrepreneurship-workshop", // Dynamic route
    },
    {
      id: 3,
      title: "Drawing Competition",
      description:
        "Join our exciting Drawing Competition and showcase your artistic talent.",
      imageUrl:
        "https://media.istockphoto.com/id/844357070/photo/back-to-school-concept.jpg?s=612x612&w=0&k=20&c=N91gKNVv8ljPNcpx3Aha2m8yct_b8QHdBnuBdqP-ZLY=",
      route: "/academic-activity/drawing-competition", // Dynamic route
    },
    {
      id: 4,
      title: "Best Introduction",
      description:
        "Learn the skills to make a lasting impression in any setting, from meetings to social events by giving your attractive introduction.",
      imageUrl:
        "https://media.istockphoto.com/id/1422817042/vector/diversity-handshake-with-two-businesspeople.jpg?s=612x612&w=0&k=20&c=Rqxr0JC9xk1qBaJm2Vl7ErrC3F-Z5eB1Mx_dVC_YDt8=",
      route: "/academic-activity/best-introduction", // Dynamic route
    },
    {
      id: 5,
      title: "Coding Challenge",
      description:
        "Calling all coders! Join our Coding Challenge and solve real-world problems.",
      imageUrl:
        "https://media.istockphoto.com/id/1262697466/vector/programming-code-icon-3d-low-polygonal-abstract-programming-code-symbol-coding-or-hacker.jpg?s=612x612&w=0&k=20&c=9A8KUPzUHRvyAbIWR7wUzPhXVahBesidXexyqTd71fI=",
      route: "/academic-activity/coding-challenge", // Dynamic route
    },
    {
      id: 6,
      title: "Poetry Contest",
      description:
        'Express yourself through poetry in our Poetry Contest. Theme: "Emotions Unveiled".',
      imageUrl:
        "https://media.istockphoto.com/id/1313283994/vector/3d-isometric-flat-vector-conceptual-illustration-of-creative-content-writing.jpg?s=612x612&w=0&k=20&c=mQ4aX12qBxcwK1j9o8BUwYlyJQxWFkb-W-suMfLGqkQ=",
      route: "/academic-activity/poetry-contest", // Dynamic route
    },
    {
      id: 7,
      title: "Acting Show",
      description:
        "Drama enthusiasts, this is your stage! Showcase your acting skills.",
      imageUrl:
        "https://media.istockphoto.com/id/1322032180/vector/children-taking-acting-classes-vector-cartoon-illustration.jpg?s=612x612&w=0&k=20&c=fd98zjT7U4zWPUc0qpU7yy3hCztWnSqpYUdXy51Yg-U=",
      route: "/academic-activity/acting-show", // Dynamic route
    },
    // Add more academic activities as needed
  ];

  const steps = [
    {
      title: "Step 1: Application",
      description:
        "Complete the online application form with your personal details.",
    },
    {
      title: "Step 2: Document Submission",
      description:
        "Upload the required documents, including transcripts and certificates.",
    },
    {
      title: "Step 3: Application Review",
      description:
        "Our admission committee will review your application and documents.",
    },
    {
      title: "Step 4: Interview",
      description:
        "If selected, you will be invited for an interview with our admissions team.",
    },
    {
      title: "Step 5: Admission Decision",
      description:
        "You will receive an email with the admission decision and further instructions.",
    },
    {
      title: "Step 6: Be active",
      description:
        "It is suggested you to be active in our college website to get further notices and informations.",
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (detail === "academic-activities") {
    detailContent = (
      <div className={styles.academicActivities}>
        <h2>Academic activities</h2>
        <p>
          Explore the academic activities and creative initiatives at our
          college.
        </p>

        {/* Map through the array of academic activities and render activity cards */}
        {academicActivities.map((activity) => (
          <div key={activity.id} className={styles.activityCard}>
            <img
              src={activity.imageUrl}
              alt={activity.title}
              className={styles.activityImage}
            />
            <div className={styles.activityInfo}>
              <h3>{activity.title}</h3>
              <p>{activity.description}</p>
              <Link to={activity.route} className={styles.activityLink}>
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (detail === "campus") {
    detailContent = (
      <div className={Campus.campusContainer}>
        <h2>Welcome to Our College Campus</h2>
        <p>Discover the beauty and facilities of our vibrant college campus.</p>

        <div className={Campus.campusFeatures}>
          <div className={Campus.campusFeature}>
            <img
              src="https://media.istockphoto.com/id/160768331/photo/library-bookshelf-diminishing-perspective.jpg?s=612x612&w=0&k=20&c=dTYBo_QnOqOq2dgmxhehwc_GaHblpXQrxB3SJmH3M88="
              alt="Library"
            />
            <h3>Library</h3>
            <p>
              Our well-stocked library provides a quiet and conducive
              environment for studying and research.
            </p>
          </div>

          <div className={Campus.campusFeature}>
            <img
              src="https://media.istockphoto.com/id/597963388/photo/university-students-study-in-a-classroom-with-male-lecturer.jpg?s=612x612&w=0&k=20&c=c4yC47WOBpgzZSs1tpwaFqrwtWxCCbOhnG8IFe1O6Ko="
              alt="Classroom"
            />
            <h3>Classrooms</h3>
            <p>
              Modern and spacious classrooms equipped with advanced teaching
              technology for an excellent learning experience.
            </p>
          </div>

          <div className={Campus.campusFeature}>
            <img
              src="https://media.istockphoto.com/id/184116635/photo/baseball-batter-in-green-uniform-hitting-ball.jpg?s=612x612&w=0&k=20&c=gffrQthP2CnwyRK0pMKbl07C1wrz4b81LNJA5xwIsO4="
              alt="Sports"
            />
            <h3>Sports Facilities</h3>
            <p>
              Stay active and healthy with our state-of-the-art sports
              facilities including a gym, sports fields, and indoor courts.
            </p>
          </div>

          <div className={Campus.campusFeature}>
            <img
              src="https://media.istockphoto.com/id/541577650/photo/students-go-to-campus-through-park.jpg?s=612x612&w=0&k=20&c=fNmEJh5s0X-0ddiBGEuyxN6HQhNIwEAQVIAlq0txFvU="
              alt="Campus Life"
            />
            <h3>Campus Life</h3>
            <p>
              Experience a vibrant campus life with clubs, events, and cultural
              activities that cater to various interests.
            </p>
          </div>
          <div className={Campus.campusFeature}>
            <img
              src="https://media.istockphoto.com/id/157476686/photo/university-lecture-hall-college-dorm-school-or-campus-education-building.jpg?s=612x612&w=0&k=20&c=vHUbXlEiNQvgK0Jo96SflLppzFgSxF-oHNC7UMVpOP8="
              alt="College building"
            />
            <h3>College building</h3>
            <p>
              Feel free to go and study at anywhere in such a huge college
              building.
            </p>
          </div>
          <div className={Campus.campusFeature}>
            <img
              src="https://media.istockphoto.com/id/1286692956/photo/empty-cafe-interior-with-chairs-and-tables.jpg?s=612x612&w=0&k=20&c=8rBA3ZWw6Cc4usSNj4QOkXRMfclmOlOU_HpH9emZLRA="
              alt="Canteen"
            />
            <h3>Canteen</h3>
            <p>
              Get anything that you want to eat from our facilitated canteen
            </p>
          </div>
        </div>

        <div className={Campus.campusMap}>
          <h3>Explore Our Campus</h3>
          <iframe
            title="Campus Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.123456789!2d73.7456789012!3d18.5678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c123456789ab%3A0x1234567890abcdef!2sPG%20Moze%20College%20Wagholi!5e0!3m2!1sen!2sin!4v1634230660620!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    );
  } else if (detail === "admission-process") {
    detailContent = (
      <div>
        <div className={admitprocess.admissionProcess}>
          <h2>Admission Process</h2>
          <div className={admitprocess.stepsContainer}>
            <div className={admitprocess.step}>
              <h3>{steps[currentStep].title}</h3>
              <p>{steps[currentStep].description}</p>
              <div className={admitprocess.navigation}>
                {currentStep > 0 && (
                  <button onClick={handlePrevious}>Previous</button>
                )}
                {currentStep < steps.length - 1 && (
                  <button onClick={handleNext}>Next</button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <FAQ />
        </div>
      </div>
    );
  }

  if (!detail) {
    return <PageNotFound />;
  }

  return <div>{detailContent}</div>;
}

export default BasicDetails;
