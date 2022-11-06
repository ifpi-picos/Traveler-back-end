import UserDTO from "../../models/user";


export interface IUserServiceInterface {
    getById( id: number ): Promise<UserDTO>;
    addUser({ name, email, password }: UserDTO): void;
    updateUser({ name, email, address, password }: UserDTO, id: number): Promise<UserDTO>;
    deleteUser( id: number ): Promise<string>;
}
