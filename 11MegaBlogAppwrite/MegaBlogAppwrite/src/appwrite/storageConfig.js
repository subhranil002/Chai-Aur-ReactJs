import config from "../config/config.js";
import { ID, Client, Storage } from "appwrite";

class StorageConfig {
    client = new Client();
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.bucket = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log(`Appwrite Service :: Upload File :: Error ${error}`);
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(config.appwriteBucketId, fileId);

            return true;
        } catch (error) {
            console.log(`Appwrite Service :: Delete File :: Error ${error}`);
            return false;
        }
    }

    async getFilePreview(fileId) {
        try {
            return await this.bucket.getFilePreview(config.appwriteBucketId, fileId);
        } catch (error) {
            console.log(
                `Appwrite Service :: Get File Preview :: Error ${error}`
            );
        }
    }
}

const storageConfig = new StorageConfig();
export default storageConfig;
