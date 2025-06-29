import { databases } from "../../../utils/appwriteConfig";

const DATABASE_ID = "67ecd5140016e131dbbf"; // 🛠 Replace with your DB ID
const COLLECTION_ID = "67ee5353003cbe59d7b7"; // 🛠 Replace with your collection ID

export const deleteListing = async (documentId) => {
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, documentId);
    console.log("Listing deleted from Appwrite DB");
  } catch (error) {
    console.error("Failed to delete from Appwrite:", error);
    throw error;
  }
};
