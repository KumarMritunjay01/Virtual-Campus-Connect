import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import Card from "./Home Cards/Card";
import NoticeBoard from "../Notices/Notices and updates board/NoticeBoard";
import AdmissionNoticeBoard from "../Notices/Admission list board/AdmissionList";

import Founder from "../images/Founder.jpg";
import hodImg from "../images/Hod-of-IT.jpg";
import PrinipleImg from "../images/Kolgiri-sir.png";
import campusImage1 from "../images/campus-01.jpg";
import campusImage2 from "../images/campus-02.jpg";
import campusImage3 from "../images/campus-03.jpg";
import campusImage4 from "../images/campus-04.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Adjust the autoplay speed (in milliseconds)
  };

  const marqueeRef = useRef(null);

  const stopMarquee = () => {
    marqueeRef.current.stop();
  };

  const startMarquee = () => {
    marqueeRef.current.start();
  };

  return (
    <div className={styles.home}>
      {/* section for Carousel */}
      <section className={styles.carousel}>
        <div className={styles.carouselContainer}>
          <Slider {...carouselSettings}>
            <div>
              <img
                src={campusImage1}
                alt="campusImage 1"
                width={1600}
                height={600}
                className={styles.carouselImage}
              />
            </div>
            <div>
              <img
                src={campusImage2}
                alt="campusImage 2}"
                width={1600}
                height={600}
                className={styles.carouselImage}
              />
            </div>
            <div>
              <img
                src={campusImage3}
                alt="campusImage 3"
                width={1600}
                height={600}
                className={styles.carouselImage}
              />
            </div>
            <div>
              <img
                src={campusImage4}
                alt="campusImage 4"
                width={1600}
                height={600}
                className={styles.carouselImage}
              />
            </div>
          </Slider>
        </div>
      </section>
      {/* section for latest news marquee */}
      <section className={styles.marqueediv}>
        <div className={styles.latestnews}>Latest news</div>
        <marquee
          behavior="scroll"
          direction="left"
          scrollamount="5"
          onMouseOver={stopMarquee}
          onMouseOut={startMarquee}
          ref={marqueeRef}
        >
          <Link to="/latest-news/announcements">
            <span>
              <span>Campus Announcements & Notices</span>
            </span>
          </Link>
          <Link to="/latest-news/events">
            <span>Student Events & Online Activities</span>
          </Link>
          <Link to="/latest-news/seminars-workshops">
            <span>Seminars, Webinars & Workshops</span>
          </Link>
        </marquee>
      </section>
      {/* section for notice boards */}
      <section className={styles.collegenotices}>
        <NoticeBoard />
        <AdmissionNoticeBoard />
      </section>
      {/* section for College Portals */}
      <section className={styles.portals}>
        <h2>College Portals</h2>
        <div className={styles.portalLinks}>
          {/* <Link to={"/results"} className={styles.portalLink}>
            <div className={styles.portalbtn}>Result</div>
          </Link> */}
          <Link to={"/academic-staff"} className={styles.portalLink}>
            <div className={styles.portalbtn}>Academic staff</div>
          </Link>
          {/* <Link to={"/NEP-syllabus"} className={styles.portalLink}>
            <div className={styles.portalbtn}>syllabus</div>
          </Link> */}
          <Link to={"/online-services"} className={styles.portalLink}>
            <div className={styles.portalbtn}>Online services</div>
          </Link>
          <Link to={"/e-learning"} className={styles.portalLink}>
            <div className={styles.portalbtn}>E-Learning</div>
          </Link>
        </div>
      </section>
      {/* section for Important person of the university */}
      <section className={styles.importantPersonSection}>
        <div className={styles.governorDiv}>
          <img src={Founder} alt="Founder" className={styles.personImg} />
          <div className={styles.governorDetailDiv}>
            <p className={styles.governorName}>Mr.Rambhau Moze</p>
            <p className={styles.governorPara}>
              President
              <br />
              <br />
              Mr. Rambhau Moze, the founder of our college
            </p>
            <button className={styles.ProfileBtn}>
              <a href="/founder-history">View Profile</a>
            </button>
          </div>
        </div>
        <div className={styles.viceChancellorDiv}>
          <img
            src={PrinipleImg}
            alt="Principal of College"
            className={styles.personImg}
          />
          <div className={styles.viceChancellorDetailDiv}>
            <p className={styles.viceChancellorName}>Dr. Somnath Kolgiri</p>
            <p className={styles.viceChancellorPara}>
              Principle of College
              <br />
              <br />
            </p>

            <button className={styles.ProfileBtn}>
              <a href="https://in.linkedin.com/in/dr-somnath-kolgiri-b5b6127a">
                View Profile
              </a>
            </button>
          </div>
        </div>
        <div className={styles.creatorDiv}>
          <img
            src={hodImg}
            alt="Head of Department"
            className={styles.personImg}
          />

          <div className={styles.creatorDetailDiv}>
            <p className={styles.creatorName}>Mr.Prof. Abidali Shaikh</p>
            <p className={styles.creatorPara}>
              Head of Department -IT
              <br />
              <br />
            </p>

            <button className={styles.ProfileBtn}>
              <a
                href="https://www.linkedin.com/in/abidali-shaikh-8980a024/"
                target="_blank"
              >
                View Profile
              </a>
            </button>
          </div>
        </div>{" "}
      </section>
      {/* section for College Feature Cards */}
      <section className={styles.cards}>
        <h2>Explore Our Features</h2>
        <div className={styles.cardContainer}>
          <Link to={"/academic-activities"}>
            <Card
              title="Academic Programs"
              description=" our wide range of academic programs."
              imageUrl="https://media.istockphoto.com/id/1024531876/photo/key-success-in-graduate-study-abroad-program-and-open-or-expand-world-view-experience-concept.jpg?s=612x612&w=0&k=20&c=JmOTvUiZgXG8okKmoakKD_CGi0j8cd_mC5HhT3ayysY="
            />
          </Link>
          <Link to={"/campus"}>
            <Card
              title="Campus Life"
              description="Explore our vibrant campus life and activities."
              imageUrl="https://media.istockphoto.com/id/1298197207/vector/children-online-learning-concept.jpg?s=612x612&w=0&k=20&c=GukmEs0Lc27npsyAq5VL87-kGkD2HD_pJJ6rFpYP8BY="
            />
          </Link>
          <Link to={"/admission-process"}>
            <Card
              title="Admission Process"
              description="Learn about admission process."
              imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBZowIaxqvuGBIgTpIJ6oz3GRhc0qo7rnEtQ&usqp=CAU"
            />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
