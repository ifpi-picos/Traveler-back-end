import UserDTO from "../../models/user";
import Auth from "../../models/auth";
import tokenInterface from "../../models/token";


export default interface IAuthServiceInterface {
    getToken(user: UserDTO): string;
    login({email, password}: Auth): Promise<any>;
}
