import React from "react";
import styles from "./404Page.module.css";
import errorImage from '../images/404-error-image.png'

function PageNotFound() {
  return (
    <div className={styles.pageNotFound}>
      <div className={styles.content}>
        <img src={errorImage} className={styles.errorImage} alt="Error" />
        <h1 className={styles.title}>Oops! Page Not Found</h1>
        <p className={styles.description}>
          The page you are looking for might have been removed or is
          temporarily unavailable.
        </p>
        <a href="/" className={styles.link}>
          Go back to the home page
        </a>
      </div>
    </div>
  );
}

export default PageNotFound;
