import config from "../config/config.js";
import { ID, Client, Databases, Query } from "appwrite";

class DBConfig {
    client = new Client();
    database;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.database = new Databases(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.database.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                ID.unique(),
                { title, slug, content, featuredImage, status, userId }
            );
        } catch (error) {
            console.log(`Appwrite Service :: Create Post :: Error ${error}`);
        }
    }

    async updatePost(
        postId,
        { title, slug, content, featuredImage, status, userId }
    ) {
        try {
            return await this.database.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                postId,
                { title, slug, content, featuredImage, status }
            );
        } catch (error) {
            console.log(`Appwrite Service :: Update Post :: Error ${error}`);
        }
    }

    async deletePost(postId) {
        try {
            await this.database.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                postId
            );

            return true;
        } catch (error) {
            console.log(`Appwrite Service :: Delete Post :: Error ${error}`);
            return false;
        }
    }

    async getPost(postId) {
        try {
            return await this.database.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                postId
            );
        } catch (error) {
            console.log(`Appwrite Service :: Get Post :: Error ${error}`);
        }
    }

    async getPosts() {
        try {
            return await this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                [Query.equal("status", "active")]
            );
        } catch (error) {
            console.log(`Appwrite Service :: Get Posts :: Error ${error}`);
        }
    }
}

const dbConfig = new DBConfig();
export default dbConfig;
