import UserDTO, { SecureUser } from "../../models/user";


export default interface IUserServiceInterface {
    getById( id: number ): Promise<SecureUser>;
    addUser({ name, email, password }: UserDTO): Promise<string>;
    updateUser({ name, email, password }: UserDTO, id: number): Promise<SecureUser>;
    deleteUser( id: number ): Promise<string>;
    verifyUserExist(id: number): Promise<SecureUser>;
    userActive(user: UserDTO): boolean | undefined;
}
