import config from "../config/config.js";
import { ID, Client, Account } from "appwrite";

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async login(email, password) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.log(`Appwrite Service :: Login :: Error ${error}`);
        }
    }

    async createAccount({ name, email, password }) {
        try {
            return await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
        } catch (error) {
            console.log(`Appwrite Service :: Create Account :: Error ${error}`);
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            if (user) {
                return user;
            } else {
                return null;
            }
        } catch (error) {
            console.log(
                `Appwrite Service :: Get Current User :: Error ${error}`
            );
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log(`Appwrite Service :: Logout :: Error ${error}`);
        }
    }
}

const authService = new AuthService();
export default authService;
