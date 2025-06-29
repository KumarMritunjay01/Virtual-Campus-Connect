import { databases } from "../../../utils/appwriteConfig"; // Ensure correct path

const DATABASE_ID = "67ecd5140016e131dbbf";
const COLLECTION_ID = "67ee5353003cbe59d7b7";

/**
 * Fetch listings from Appwrite database.
 * @returns {Promise<Array>} - Returns an array of listing documents.
 */
export async function fetchListings() {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    return response.documents;
  } catch (error) {
    console.error("⚠️ Error fetching listings:", error);
    throw new Error("Failed to load listings. Please try again later.");
  }
}
