import React from "react";
import PropTypes from "prop-types";
import sign from "../../images/signature-png.png";
import logo from "../../images/logo.jpg";
import styles from "./FeeReceipt.module.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function FeeReceipt({ studentId, amount, paymentMethod }) {
  const currentDate = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const handleDownloadFeeReceipt = () => {
    const FeeReceiptSection = document.getElementById("FeeReceiptSection"); // ID of the fee receipt section

    if (!FeeReceiptSection) {
      console.error("Fee receipt section not found.");
      return;
    }

    // Use html2canvas to capture the fee receipt section as an image
    html2canvas(FeeReceiptSection, { allowTaint: true, useCORS: true }).then(
      (canvas) => {
        const imgData = canvas.toDataURL("image/png");

        // Calculate the page size based on the fee receipt section's size
        const pageWidth = 210; // A4 page width in mm
        const pageHeight =
          (FeeReceiptSection.clientHeight * pageWidth) /
          FeeReceiptSection.clientWidth;
        const orientation = "p"; // Portrait

        // Create a new jsPDF instance
        const pdf = new jsPDF(orientation, "mm", "a4");

        // Add the captured image to the PDF
        pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);

        // Download the PDF with a unique filename (e.g., based on the student's id)
        pdf.save(`VDU_Fee_Receipt_${studentId}.pdf`);
      }
    );
  };

  return (
    <>
      <div id="FeeReceiptSection" className={styles.FeeReceiptContainer}>
        <div>
          <img src={logo} className={styles.FeeReceiptLogo} />
          {/* <h2 className={styles.FeeReceiptUniName}>
            Vishal Digital University, Aligarh
          </h2> */}
          <h2 className={styles.FeeReceiptHeading}>Fee Receipt</h2>
          <div className={styles.paymentDetails}>
            <p className={styles.paymentDetailsHeading}>Payment Details:</p>
            <p className={styles.para}>
              Student ID: <span>{studentId}</span>
            </p>
            <p className={styles.para}>
              Payment Amount: <span>{amount}</span>
            </p>
            <p className={styles.para}>
              Payment Method: <span>{paymentMethod}</span>
            </p>
            <p className={styles.paymentStatus}>
              Payment status: <span>PAID</span>
            </p>
            <div className={styles.FeeReceiptFooter}>
              <p className={styles.date}>
                Date: {currentDate}/{currentMonth + 1}/{currentYear}
              </p>
              <p className={styles.signatureParagraph}>
                Signature: <img src={sign} />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.downloadDiv}>
        {/* ... Download fee receipt as pdf ... */}
        <button
          onClick={handleDownloadFeeReceipt}
          className={styles.downloadBtn}
        >
          Download Fee Receipt (PDF)
        </button>
      </div>
    </>
  );
}

FeeReceipt.propTypes = {
  studentId: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  paymentMethod: PropTypes.string.isRequired,
};

export default FeeReceipt;
