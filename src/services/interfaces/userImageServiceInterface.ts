import { FirebaseUrl, SecureUser } from "../../models/user";


export default interface IUserImageServiceInterface {
    uploadImage(image: Express.Multer.File , id: string): Promise<FirebaseUrl>;
    verifyUserExist(id: number): Promise<SecureUser | null>;
}
