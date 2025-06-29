import { databases } from "../../../utils/appwriteConfig";

const DATABASE_ID = "67ecd5140016e131dbbf";
const COLLECTION_ID = "67ee5353003cbe59d7b7";

/**
 * Fetch a single listing by ID
 * @param {string} id - Document ID
 * @returns {Promise<Object>} - Listing document
 */
export async function fetchListingById(id) {
  try {
    const response = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_ID,
      id
    );
    return response;
  } catch (error) {
    console.error("⚠️ Error fetching listing by ID:", error.message);
    throw new Error("Listing not found.");
  }
}
