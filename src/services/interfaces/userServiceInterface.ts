import UserDTO, { SecureUser } from "../../models/user";


export interface IUserServiceInterface {
    getById( id: number ): Promise<SecureUser>;
    addUser({ name, email, password }: UserDTO): Promise<string>;
    // updateImage( id: number): Promise<SecureUser>;
    updateUser({ name, email, password }: UserDTO, id: number): Promise<SecureUser>;
    deleteUser( id: number ): Promise<string>;
}
