import admin from "firebase-admin";
import serviceAccount from "../config/firebaseKey.json";
import IUserImageServiceInterface from "./interfaces/userImageServiceInterface";
import { SecureUser, FirebaseUrl } from "../models/user";
import { IUserRepository } from "../repositories/interfaces/userRepositoryInterface";

// const bucketAddress = "traveler-image-ad.appspot.com/users";
const type = process.env.type!;
const project_id = process.env.project_id!;
const private_key_id = process.env.private_key_id!;
const private_key = process.env.private_key!;
const client_email = process.env.client_email!;
const client_id = process.env.client_id!;
const auth_uri = process.env.auth_uri!;
const token_uri = process.env.token_uri!;
const auth_provider_x509_cert_url = process.env.auth_provider_x509_cert_url!;
const client_x509_cert_url = process.env.client_x509_cert_url!;

serviceAccount.auth_provider_x509_cert_url = auth_provider_x509_cert_url;
serviceAccount.auth_uri = auth_uri;
serviceAccount.client_email = client_email;
serviceAccount.client_id = client_id;
serviceAccount.client_x509_cert_url = client_x509_cert_url;
serviceAccount.private_key = private_key.replace(
    /\\n/g,
    "\n",
);
serviceAccount.private_key_id = private_key_id;
serviceAccount.project_id = project_id;
serviceAccount.token_uri = token_uri;
serviceAccount.type = type;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    // storageBucket: bucketAddress,
});

const bucket = admin.storage().bucket();

export class UserImageService implements IUserImageServiceInterface {
    private userRepository: IUserRepository;

    constructor( iUserRepository: IUserRepository) {
        this.userRepository = iUserRepository;
    }

    async uploadImage(image: Express.Multer.File , id: string): Promise<FirebaseUrl>{

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
        // firebaseUrl = `https://storage.googleapis.com/${bucketAddress}/${fileName}`;
        

        const FirebaseUrl = await this.userRepository.updateImage(firebaseUrl, Number(id));

        return FirebaseUrl;
    };

    async verifyUserExist(id: number): Promise<SecureUser | null> {
        const userExists = await this.userRepository.selectOne({ id });

        if(!userExists) throw new Error("Usuário não encontrado.");

        return userExists;
    }
}

