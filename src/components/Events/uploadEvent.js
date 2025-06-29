// src/components/Events/uploadEvent.js
import { databases, storage, ID } from "../../utils/appwriteConfig";

const uploadEvent = async (eventData) => {
  const uploadedIds = [];

  for (const file of eventData.mediaFiles) {
    const res = await storage.createFile("67f0b395002c138752a6", ID.unique(), file);
    uploadedIds.push(res.$id);
  }

  const document = await databases.createDocument(
    "67ecd5140016e131dbbf",
    "67f3dd30002bbe29c798",
    ID.unique(),
    {
      name: eventData.name,
      description: eventData.description,
      year: Number(eventData.year),
      mediaFiles: uploadedIds,
    }
  );

  return document;
};

export default uploadEvent;
