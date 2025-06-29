import { databases } from "../../utils/appwriteConfig"; // Ensure correct path
import { Query } from "appwrite";

const fetchNotes = async (branch, semester) => {
  try {
    if (!branch || semester === undefined) {
      console.error("❌ fetchNotes error: Branch or Semester is missing.");
      return [];
    }

    const response = await databases.listDocuments(
      "67ecd5140016e131dbbf", // Database ID
      "67ecd524001a882faa68", // Collection ID
      [
        Query.equal("branch", branch), // ✅ String match
        Query.equal("semester", parseInt(semester)), // ✅ Integer match
      ]
    );
    return response.documents;
  } catch (error) {
    console.error("❌ Error fetching notes:", error.message);
    return [];
  }
};

export default fetchNotes;
