import React, { useEffect, useState } from "react";
import { fetchListings } from "./fetchListings";
import { deleteListing } from "./deleteListing";
import styles from "./Listing.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { account } from "../../../utils/appwriteConfig";

function AccomodationListing() {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function loadListings() {
      try {
        try {
          const user = await account.get();
          setCurrentUser(user);
        } catch (err) {
          setCurrentUser(null);
        }

        const data = await fetchListings();
        const listingsWithImages = data.map((listing) => ({
          ...listing,
          imagePreview: listing.image || null,
        }));

        setListings(listingsWithImages);
        setFilteredListings(listingsWithImages);
      } catch (err) {
        setError("Failed to load listings.");
      } finally {
        setLoading(false);
      }
    }

    loadListings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?"))
      return;

    try {
      await deleteListing(id);
      const updated = listings.filter((item) => item.$id !== id);
      setListings(updated);
      setFilteredListings(updated);
    } catch (err) {
      alert("Failed to delete. Please try again.");
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = listings.filter(
      (listing) =>
        listing.title?.toLowerCase().includes(query) ||
        listing.location?.toLowerCase().includes(query) ||
        listing.pricePerMonth?.toString().includes(query)
    );

    setFilteredListings(filtered);
  };

  const handlePay = (listing) => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please try again later.");
      return;
    }

    const options = {
      key: "rzp_test_jyJP4xyl5079aJ",
      amount: listing.pricePerMonth * 100,
      currency: "INR",
      name: "Student Mart Accommodations",
      description: listing.title,
      image: "https://your-logo-url.com/logo.png",
      handler: function (response) {
        alert(
          `✅ Payment successful!\nPayment ID: ${response.razorpay_payment_id}`
        );
      },
      prefill: {
        name: currentUser?.name || "Student",
        email: currentUser?.email || "student@example.com",
        contact: listing.contact || "",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className={styles.listingContainer}>
      <div className={styles.listingHeader}>
        <h2 className={styles.heading}>Available Accommodations</h2>
        <input
          type="text"
          placeholder="Search by title, location ..."
          value={searchQuery}
          onChange={handleSearch}
          className={styles.searchInputHeader} // Corrected class name based on your CSS
        />
        <Link to="/studentmart/add-listing" className={styles.addButton}>
          Add New Listing
        </Link>
      </div>

      {loading && <p>Loading listings...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.listingsGrid}>
        {filteredListings.length > 0
          ? filteredListings.map((listing) => (
              <div key={listing.$id} className={styles.listingCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.titleWithActions}>
                    <h3 className={styles.titleText}>{listing.title}</h3>

                    {currentUser?.$id === listing.userId && (
                      <div className={styles.actionButtons}>
                        <Link
                          to={`/studentmart/edit/${listing.$id}`}
                          className={styles.iconCircle}
                          title="Edit"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                        <button
                          className={`${styles.iconCircle} ${styles.deleteButton}`}
                          onClick={() => handleDelete(listing.$id)}
                          title="Delete"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <p className={styles.shortDesc}>
                  {listing.description?.slice(0, 100)}...
                </p>

                {listing.imagePreview ? (
                  <img
                    src={listing.imagePreview}
                    alt={listing.title}
                    className={styles.listingImage}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.png";
                    }}
                  />
                ) : (
                  <p className={styles.noImage}>No Image Available</p>
                )}

                <div className={styles.cardFooter}>
                  <p className={styles.price}>
                    ₹{listing.pricePerMonth || "N/A"} /month
                  </p>
                  <Link
                    to={`/studentmart/listing/${listing.$id}`}
                    className={styles.viewButtonInline}
                  >
                    View
                  </Link>
                </div>

                <button
                  className={styles.payButton}
                  onClick={() => handlePay(listing)}
                >
                  Pay ₹{listing.pricePerMonth || 0}
                </button>
              </div>
            ))
          : !loading && <p>No listings found.</p>}
      </div>
    </div>
  );
}

export default AccomodationListing;
