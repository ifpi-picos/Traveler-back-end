import admin from "firebase-admin";
import serviceAccount from "../config/firebaseKey.json";
import IUserImageServiceInterface from "./interfaces/userImageServiceInterface";
import UserDTO, { UserImage } from "../models/user";
import { IUserRepository } from "../repositories/interfaces/userRepositoryInterface";

const bucketAddress = "traveler-image-ad.appspot.com";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: bucketAddress,
});

const bucket = admin.storage().bucket();

export class UserImageService implements IUserImageServiceInterface {
    private userRepository: IUserRepository;

    constructor( iUserRepository: IUserRepository) {
        this.userRepository = iUserRepository;
    }

    async uploadImage(image: Express.Multer.File , id: string): Promise<UserImage>{

        await this.verifyUserExist(Number(id));

        let firebaseUrl: string = "";
        const fileName =  id + "." + image.originalname.split(".").pop();
        const file = bucket.file(fileName);
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

        // obter a url publica
        firebaseUrl = `https://storage.googleapis.com/${bucketAddress}/${fileName}`;
        

        const msg = await this.userRepository.createImage(firebaseUrl, Number(id));

        return {msg, firebaseUrl};
    };

    async verifyUserExist(id: number): Promise<UserDTO | null> {
        const userExists = await this.userRepository.selectOne({ id });

        if(!userExists) throw new Error("Usuário não encontrado.");

        return userExists;
    }
}

