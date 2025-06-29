import { useEffect, useState } from "react";
import { databases } from "../../../utils/appwriteConfig"; // Import Appwrite database configuration

const FetchItems = ({ onFetchSuccess }) => {
  const [loading, setLoading] = useState(true); // To show loading state
  const [error, setError] = useState(""); // To capture any errors during the fetch
  const [items, setItems] = useState([]); // To store fetched items

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await databases.listDocuments(
          "67ecd5140016e131dbbf", // Replace with your Database ID
          "67f12b340032733f18be" // Replace with your Collection ID
        );
        setItems(response.documents); // Set the items to state
        onFetchSuccess(response.documents); // Pass fetched items to parent component
      } catch (error) {
        console.error("Error fetching items:", error);
        setError("Failed to fetch items. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchItems();
  }, [onFetchSuccess]);

  if (loading) {
    return <p>Loading items...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return null; // No need to render anything here
};

export default FetchItems;
