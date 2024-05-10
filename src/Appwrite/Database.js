import { Account, Client, Databases, ID, Query, Storage } from "appwrite";
import Config from "../Config/Config";

export class databaseService{
    client= new Client()
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(Config.appwriteEndpoint)
            .setProject(Config.appwriteProjID)
        this.databases= new Databases(this.client);
        this.storage= new Storage(this.client);
    }

    async createPost({Title, Slug, Content, Image, Status, UserID}){
        try {
            return await this.databases.createDocument(
                Config.appwriteDBID,
                Config.appwriteCollectionID,
                Slug,
                {
                    Title,
                    Content,
                    Image,
                    Status,
                    UserID,
                }
            )
        } catch (error) {
            throw error
        }
    }

    async updatePost(Slug, {Title, Content, Image, Status}){
        try {
            return await this.databases.updateDocument(
                Config.appwriteDBID,
                Config.appwriteCollectionID,
                Slug,
                {
                    Title,
                    Content,
                    Image,
                    Status,
                },

                alert("Your Post has been Successfully Updated!!!")
            )
        } catch (error) {
            throw error
        }
    }

    async deletePost(Slug){
        try {
            await this.databases.deleteDocument(
                Config.appwriteDBID,
                Config.appwriteCollectionID,
                Slug,
                // alert("Your Post has been Succesfully Deleted!!!")
            )
            return true;
        } catch (error) {
            throw error
            return false;
        }
    }

    async getPost(Slug){
        try {
            return await this.databases.getDocument(
                Config.appwriteDBID,
                Config.appwriteCollectionID,
                Slug,
            )
        } catch (error) {
            throw error
            return false;
        }
    }

    async listPost(queries=[Query.equal("Status", "Active")]){
        try {
            return await this.databases.listDocuments(
                Config.appwriteDBID,
                Config.appwriteCollectionID,
                queries,
            )
        } catch (error) {
            throw error
            return false;
        }
    }

    async uploadFile(File){
        try {
            return await this.storage.createFile(
                Config.appwriteBucketID,
                ID.unique(),
                File
            )
        } catch (error) {
            throw error
            return false
        }
    }

    async deleteFile(FileID){
        try {
            await this.storage.deleteFile(
                Config.appwriteBucketID,
                FileID,
            )
            return true;
        } catch (error) {
            throw error
            return false;
        }
    }

    async filePreview(FileID){
        try {
            return await this.storage.getFilePreview(
                Config.appwriteBucketID,
                FileID,  
            )
        } catch (error) {
            throw error
            return false
        }
    }

}

const dbService= new databaseService();
export default dbService