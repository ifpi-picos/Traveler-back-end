import UserDTO, { SecureUser } from "../../models/user";


export interface IUserServiceInterface {
    getById( id: number ): Promise<SecureUser>;
    addUser({ name, email, password }: UserDTO): Promise<string>;
    updateUser({ name, email, address, password }: UserDTO, id: number): Promise<SecureUser>;
    deleteUser( id: number ): Promise<string>;
}
