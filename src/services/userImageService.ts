import admin from "firebase-admin";
import serviceAccount from "../config/firebaseKey.json";
import IUserImageServiceInterface from "./interfaces/userImageServiceInterface";
import UserDTO, { SecureUser, FirebaseUrl } from "../models/user";
import { IUserRepository } from "../repositories/interfaces/userRepositoryInterface";

const bucketAddress = "traveler-image-ad.appspot.com";
const private_key_id = process.env.private_key_id!;
const private_key = process.env.private_key!;

serviceAccount.private_key = private_key.replace(
    /\\n/g,
    "\n",
);
serviceAccount.private_key_id = private_key_id;

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

    async uploadImage(image: Express.Multer.File , id: string): Promise<FirebaseUrl>{

        const user = await this.verifyUserExist(Number(id));
        this.userActive(user);

        let firebaseUrl: string = "";
        const fileName =  id + "." + image.originalname.split(".").pop();
        const file = bucket.file("user/" + fileName);
        const stream = file.createWriteStream({
            metadata: {
                contentType: image.mimetype,
            },
        });
        
        stream.on("error", (error: any) => {
            throw new Error(error);
        })

        stream.end(image.buffer);

        await file.save(image.buffer)

        //tornar o arquivo publico
        await file.makePublic();

        // obter a url publica
        firebaseUrl = file.publicUrl();
        

        const FirebaseUrl = await this.userRepository.updateImage(firebaseUrl, Number(id));

        return FirebaseUrl;
    };

    async verifyUserExist(id: number): Promise<UserDTO> {
        const userExists = await this.userRepository.selectOne({ id });

        if(!userExists) throw new Error("Usuário não encontrado.");

        return userExists;
    }

    
    userActive(user: UserDTO): boolean {
        if(!user.active) throw new Error("Usuário inativo.");
        return user.active;
    }
}

