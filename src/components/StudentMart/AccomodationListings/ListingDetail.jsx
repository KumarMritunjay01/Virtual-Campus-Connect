import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchListingById } from "./fetchListingById";
import styles from "./ListingDetail.module.css";

function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getListing() {
      console.log("Fetching listing with ID:", id); // Debugging the ID
      try {
        const data = await fetchListingById(id);
        console.log("Fetched listing:", data); // Debug log
        setListing(data);
      } catch (err) {
        setError(err.message || "Failed to fetch listing.");
      } finally {
        setLoading(false);
      }
    }

    getListing();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  // ✅ Use the correct field for description
  const description = listing.description || "No description available.";
  const location = listing.location || "No location available"; // Use location if available

  return (
    <div className={styles.detailContainer}>
      {/* Left Section: Details */}
      <div className={styles.detailsSection}>
        <h2 className={styles.title}>{listing.title || "Untitled Listing"}</h2>
        <p className={styles.createdBy}>
          <strong>Owner Name:</strong> {listing.createdBy || "Unknown"}
        </p>
        <p className={styles.createdAt}>
          <strong>Posted On:</strong>{" "}
          {listing.createdAt
            ? new Date(listing.createdAt).toLocaleDateString()
            : "Unknown Date"}
        </p>
        <p className={styles.longDescription}>
          <strong>Description:</strong> {description}
        </p>
        <p className={styles.price}>
          <strong>Price Per Month:</strong> ₹{listing.pricePerMonth || "N/A"}
        </p>
        {listing.ownerContact && (
          <p className={styles.contact}>
            <strong>Contact Number:</strong> {listing.ownerContact}
          </p>
        )}
        {listing.ownerEmail && (
          <p className={styles.email}>
            <strong>Email:</strong> {listing.ownerEmail}
          </p>
        )}
      </div>

      {/* Right Section: Image & Location */}
      <div className={styles.mediaSection}>
        {listing.image ? (
          <img
            src={listing.image}
            alt={listing.title}
            className={styles.listingImage}
            onError={(e) => (e.target.style.display = "none")}
          />
        ) : (
          <p className={styles.noImage}>No Image Available</p>
        )}

        {/* Render Location */}
        {location !== "No location available" ? (
          <div className={styles.locationContainer}>
            <strong>Location:</strong> {location}
            {/* If location is a Google Maps URL */}
            {/* {location.includes("https://maps.google.com") && (
              <iframe
                title="Google Map Location"
                src={location}
                className={styles.map}
                allowFullScreen
                loading="lazy"
              ></iframe>
            )} */}
          </div>
        ) : (
          <p className={styles.noLocation}>No Location Available</p>
        )}
      </div>
    </div>
  );
}

export default ListingDetail;
