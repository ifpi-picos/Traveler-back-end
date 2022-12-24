import admin from "firebase-admin";
import serviceAccount from "../config/firebaseKey.json";
import IVehicleImageServiceInterface from "./interfaces/vehicleImageServiceInterface";
import { IAnnouncementRepository } from "../repositories/interfaces/announcementRepositoryInterface";

const bucketAddress = "traveler-image-ad.appspot.com";
const bucket = admin.storage().bucket();

export class VehicleImageService implements IVehicleImageServiceInterface {

    async uploadImage(image: Express.Multer.File): Promise<string>{

        const fileName = `${Date.now()}` + "." + image.originalname.split(".").pop();
        const file = bucket.file("vehicle/" + fileName);
        
        try {
            const stream = file.createWriteStream({
                metadata: {
                    contentType: image.mimetype,
                },
            });
            
            stream.on("error", (error: any) => {
                throw new Error(error);
            })
    
            stream.end(image.buffer);
            
            //tornar o arquivo publico
            await file.makePublic();
        } catch (error: any) {
            return error.message;
        }
  
        // obter a url publica
        const firebaseUrl = `https://storage.googleapis.com/${bucketAddress}/${fileName}`;
        
        return firebaseUrl;
    };

}

