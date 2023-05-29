import { storage } from "@/appwrite";
import { ID } from "appwrite";

const uploadImage = async (file: File) => {
    if (!file) return;
    
    const fileUploaded = await storage.createFile(
        "647185e886a04a7947fd",
        ID.unique(),
        file
    );

    return fileUploaded;
};

export default uploadImage;