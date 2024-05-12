import { Account, Client, ID } from "appwrite";
import Config from "../Config/Config";

export class AuthService{
    client= new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(Config.appwriteEndpoint)
            .setProject(Config.appwriteProjID)
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount= await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                return this.loginAccount({email, password})
            }
            else{
                return userAccount;
            }
        } catch (error) {
            console.log("Appwrite serive :: createAccount :: error", error);
        }
    }
    async loginAccount({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log("Appwrite serive :: loginAccount :: error", error);
        }
    }
    async checkCurrAccount(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: checkCurrAccount :: error", error);
        }
    }

    async logoutAccount(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logoutAccount :: error", error);
        }
    }
}

const authService= new AuthService();

export default authService