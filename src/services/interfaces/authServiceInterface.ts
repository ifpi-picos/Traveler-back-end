import UserDTO from "../../models/user";
import Auth from "../../models/auth";


export default interface IAuthServiceInterface {
    getToken(user: UserDTO): string;
    login({email, password}: Auth): Promise<any>;
}
