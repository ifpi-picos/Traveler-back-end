import UserDTO, { UserImage } from "../../models/user";


export default interface IUserImageServiceInterface {
    uploadImage(image: Express.Multer.File , id: string): Promise<UserImage>;
    verifyUserExist(id: number): Promise<UserDTO | null>;
}
