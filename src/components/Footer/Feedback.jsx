import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Feedback.module.css";
import { databases } from "../../utils/appwriteConfig";
import { ID, Permission, Role } from "appwrite";

const DATABASE_ID = "67ecd5140016e131dbbf"; // Replace with your actual DB ID
const COLLECTION_ID = "67f506d4001d477b190a"; // Replace with your Feedback collection ID

function Feedback() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [facility, setFacility] = useState("");
  const [experience, setExperience] = useState("");
  const [recommend, setRecommend] = useState("");
  const [improvements, setImprovements] = useState([]);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});

  const handleImprovementChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setImprovements([...improvements, value]);
    } else {
      setImprovements(improvements.filter((item) => item !== value));
    }
  };

  const handleSubmitFeedback = async () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "This field is required";
    if (!email.trim()) newErrors.email = "This field is required";
    if (!role) newErrors.role = "This field is required";
    if (improvements.length === 0)
      newErrors.improvements = "Please select at least one improvement";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const improvementsString = improvements.join(", ");

        await databases.createDocument(
          DATABASE_ID,
          COLLECTION_ID,
          ID.unique(),
          {
            name,
            email,
            role,
            academicYear,
            facility,
            experience,
            recommend,
            improvements: improvementsString,
            comment,
          },
          [
            Permission.read(Role.any()),
            Permission.write(Role.any()),
            Permission.delete(Role.any()),
          ]
        );

        alert("Thank you for giving your valuable feedback!");
        navigate("/");
      } catch (error) {
        console.error("Failed to submit feedback:", error);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className={styles.feedbackContainer}>
      <h1 className={styles.feedHeading}>Share Your Feedback</h1>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>College Survey Form</h1>
        <p className={styles.description}>
          Thank you for taking the time to help us improve the platform
        </p>
        <form className={styles.surveyForm}>
          {/* Name */}
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.nameLabel}>
              Name
            </label>
            <input
              type="text"
              id="name"
              className={styles.controlForm}
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className={styles.errorText}>{errors.name}</p>}
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.emailLabel}>
              Email
            </label>
            <input
              type="email"
              id="email"
              className={styles.controlForm}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          </div>

          {/* Role */}
          <div className={styles.formGroup}>
            <span className={styles.sel}>
              Which option best describes your current role?
            </span>
            <select
              className={styles.controlForm}
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                if (e.target.value !== "Student") setAcademicYear("");
              }}
            >
              <option disabled value="">
                Select current role
              </option>
              <option>Student</option>
              <option>Instructor</option>
              <option>Developer</option>
              <option>Prefer not to say</option>
              <option>Other</option>
            </select>
            {errors.role && <p className={styles.errorText}>{errors.role}</p>}
          </div>

          {/* Academic Year */}
          {role === "Student" && (
            <div className={styles.formGroup}>
              <label htmlFor="academicYear" className={styles.sel}>
                Select Academic Year
              </label>
              <select
                id="academicYear"
                className={styles.controlForm}
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
              >
                <option disabled value="">
                  Select your year
                </option>
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
              </select>
            </div>
          )}

          {/* Recommendation */}
          <div className={styles.formGroup}>
            <p className={styles.para1}>
              Would you recommend our college to your friend?
            </p>
            {["Definitely", "Maybe", "Not sure"].map((option) => (
              <div key={option}>
                <input
                  type="radio"
                  id={option}
                  name="recommend"
                  value={option}
                  checked={recommend === option}
                  onChange={(e) => setRecommend(e.target.value)}
                  className={styles.inputRadio}
                />
                <label htmlFor={option} className={styles.radioLabel}>
                  {option}
                </label>
              </div>
            ))}
          </div>

          {/* Facilities */}
          <div className={styles.formGroup}>
            <span className={styles.sel}>Facilities</span>
            <select
              className={styles.controlForm}
              value={facility}
              onChange={(e) => setFacility(e.target.value)}
            >
              <option disabled value="">
                Select an option
              </option>
              <option>Excellent</option>
              <option>Very good</option>
              <option>Good</option>
              <option>Fair enough</option>
              <option>Poor</option>
            </select>
          </div>

          {/* Experience */}
          <div className={styles.formGroup}>
            <span className={styles.sel}>Overall experience</span>
            <select
              className={styles.controlForm}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            >
              <option disabled value="">
                Select an option
              </option>
              <option>Excellent</option>
              <option>Very good</option>
              <option>Good</option>
              <option>Fair enough</option>
              <option>Poor</option>
            </select>
          </div>

          {/* Improvements */}
          <div className={styles.formGroup}>
            <p className={styles.para2}>
              What would you like to see improved?
              <span className={styles.clue}>(Check all that apply)</span>
            </p>
            {[
              "College Library",
              "College Canteen",
              "Sports",
              "Online Services",
              "Health Services",
              "Projects and Assignments",
              "Teaching Instructors",
              "Class Timing",
              "More Academic Activities",
              "Classrooms",
              "Additional Courses",
            ].map((item, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={item.replace(/\s+/g, "")}
                  value={item}
                  checked={improvements.includes(item)}
                  onChange={handleImprovementChange}
                  className={styles.inputCheckbox}
                />
                <label
                  htmlFor={item.replace(/\s+/g, "")}
                  className={styles.checkboxLabel}
                >
                  {item}
                </label>
              </div>
            ))}
            {errors.improvements && (
              <p className={styles.errorText}>{errors.improvements}</p>
            )}
          </div>

          {/* Comments */}
          <div className={styles.text}>
            <span className={styles.commentText}>
              Any additional comments or suggestions?
            </span>
            <span className={styles.clue}>(optional)</span>
            <textarea
              className={styles.comment}
              name="comment"
              placeholder="Enter your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className={styles.formGroup}>
            <button
              type="button"
              onClick={handleSubmitFeedback}
              className={styles.btn}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Feedback;
