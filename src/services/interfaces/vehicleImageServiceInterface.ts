import AnnouncementDTO from "../../models/annoucement";
import { FirebaseUrl } from "../../models/user";


export default interface IVehicleImageServiceInterface {
    uploadImage(image: Express.Multer.File , id: string): Promise<string>;
    verifyAnnouncementExist(id: number): Promise<AnnouncementDTO | null>;
}