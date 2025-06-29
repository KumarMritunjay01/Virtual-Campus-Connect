// src/appwriteConfig.js
import { Client, Account, Databases, Storage,ID } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
  .setProject("67e42bd1001bc2394907"); // Replace with your Project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export {ID}

// export { client, databases, storage };
