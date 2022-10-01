import { User } from "../models/user";

export class UserRepository {
    users: User[] = []
    findAll() {
        return this.users;
    } 
    
    user: User[] = []
    findOne() {
        return this.user
    }
}