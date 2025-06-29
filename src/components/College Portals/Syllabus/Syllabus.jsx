import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { pdfjs } from "react-pdf";
import { storage } from "../../../utils/appwriteConfig"; // Import the Appwrite storage instance
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import "./Syllabus.module.css";

// This is the main NEP-Syllabus component
const NEPSyllabus = () => {
  const { courseName } = useParams(); // Get the course name from URL params
  const [pdfFiles, setPdfFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch PDFs from Appwrite based on the courseName (branch)
  useEffect(() => {
    const fetchSyllabusFiles = async () => {
      try {
        // You can modify this to get file IDs dynamically from Appwrite Storage
        let files = [];

        if (courseName === "Electrical") {
          // Replace these with actual file IDs from Appwrite
          files = [
            "fileIdForYear1", // Example: replace with actual file ID for Year 1 syllabus
            "fileIdForYear2", // Example: replace with actual file ID for Year 2 syllabus
          ];
        }
        // You can add other branches similarly
        else if (courseName === "Mechanical") {
          files = [
            "fileIdForYear1", // Replace with actual file ID for Mechanical Year 1 syllabus
            "fileIdForYear2", // Replace with actual file ID for Mechanical Year 2 syllabus
          ];
        }

        // Get the file URLs from Appwrite Storage
        const fileUrls = await Promise.all(
          files.map(async (fileId) => {
            const file = await storage.getFileView("YOUR_BUCKET_ID", fileId);
            return file.href; // file.href is the URL of the file
          })
        );

        setPdfFiles(fileUrls);
      } catch (error) {
        console.error("Error fetching syllabus files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSyllabusFiles();
  }, [courseName]); // Run this effect whenever courseName changes

  if (loading) {
    return <div>Loading syllabus...</div>;
  }

  return (
    <div className="nepSyllabus">
      <h2>{courseName} Engineering Syllabus</h2>
      <div className="syllabusContent">
        {pdfFiles.length > 0 ? (
          <div>
            {pdfFiles.map((pdf, index) => (
              <div key={index} className="pdfViewer">
                <h3>Year {index + 1} Syllabus</h3>
                <Worker
                  workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}
                >
                  <Viewer fileUrl={pdf} />
                </Worker>
              </div>
            ))}
          </div>
        ) : (
          <p>No syllabus available for this branch.</p>
        )}
      </div>
    </div>
  );
};

export default NEPSyllabus;
