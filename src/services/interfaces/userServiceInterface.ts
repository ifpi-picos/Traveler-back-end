import { UserDTO } from "../../models/user";


export interface UserServiceInterface {
    updateUser({ name, email, address, password }: UserDTO, id: number): Promise<UserDTO>;
    deleteUser( id: number ): Promise<string>;
}
