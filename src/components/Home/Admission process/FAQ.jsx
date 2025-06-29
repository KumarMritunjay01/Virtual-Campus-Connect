// src/components/FAQ.js
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./FAQ.css";

const FAQ = () => {
  const faqs = [
    {
      question: "How can I apply for financial aid or scholarships?",
      answer:
        "To apply for financial aid, you should complete the Free Application for Federal Student Aid (FAFSA). Additionally, check with the college's financial aid office for any additional scholarship opportunities or application processes.",
    },
    {
      question: "What majors and programs does the college offer?",
      answer:
        "Colleges usually offer a variety of majors and programs. You can explore the college's official website or contact the academic advising office to get detailed information about the available majors, minors, and programs of study.",
    },
    {
      question: "Is on-campus housing available? How do I apply for it?",
      answer:
        "Most colleges provide on-campus housing options. You can apply for on-campus housing through the college's housing office or online portal. Make sure to meet the deadlines and submit any required documents.",
    },
    {
      question: "What extracurricular activities are available for students?",
      answer:
        "Colleges offer a wide range of extracurricular activities, including clubs, sports teams, volunteer opportunities, and more. Check with the student affairs office or explore the college's website to find information about available activities and how to get involved.",
    },
    {
      question: "How can I schedule a campus tour?",
      answer:
        "To schedule a campus tour, visit the college's Admissions website or contact the Admissions office directly. Many colleges offer both in-person and virtual campus tours. It's a great way to explore the campus, facilities, and get a feel for the college environment.",
    },
    {
      question:
        "What support services are available for students, such as tutoring or counseling?",
      answer:
        "Colleges provide various support services to help students succeed. This may include tutoring centers, counseling services, career development resources, and more. You can inquire about these services at the student services or counseling center on campus.",
    },
    // Add more FAQs as needed
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="faqSection">
      <h1>Frequently Asked Questions?</h1>
      <div className="faqRightDiv">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? "open" : ""}`}
          >
            <div
              className="faq-question"
              onClick={() => toggleAccordion(index)}
            >
              <span>{faq.question}</span>
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {openIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
