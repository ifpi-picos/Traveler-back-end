// import admin from "firebase-admin";
// import serviceAccount from "../config/firebaseKey";
// import IUserImageServiceInterface from "./interfaces/userImageServiceInterface";
// import { SecureUser, FirebaseUrl } from "../models/user";
// import { IUserRepository } from "../repositories/interfaces/userRepositoryInterface";

// const bucketAddress = "traveler-image-ad.appspot.com";

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
//     storageBucket: bucketAddress,
// });

// const bucket = admin.storage().bucket();

// export class UserImageService implements IUserImageServiceInterface {
//     private userRepository: IUserRepository;

//     constructor( iUserRepository: IUserRepository) {
//         this.userRepository = iUserRepository;
//     }

//     async uploadImage(image: Express.Multer.File , id: string): Promise<FirebaseUrl>{

//         await this.verifyUserExist(Number(id));

//         let firebaseUrl: string = "";
//         const fileName =  id + "." + image.originalname.split(".").pop();
//         const file = bucket.file(fileName);
//         const stream = file.createWriteStream({
//             metadata: {
//                 contentType: image.mimetype,
//             },
//         });
        
//         stream.on("error", (error: any) => {
//             throw new Error(error);
//         })

//         stream.end(image.buffer);

//         //tornar o arquivo publico
//         await file.makePublic();

//         // obter a url publica
//         firebaseUrl = `https://storage.googleapis.com/${bucketAddress}/${fileName}`;
        

//         const FirebaseUrl = await this.userRepository.updateImage(firebaseUrl, Number(id));

//         return FirebaseUrl;
//     };

//     async verifyUserExist(id: number): Promise<SecureUser | null> {
//         const userExists = await this.userRepository.selectOne({ id });

//         if(!userExists) throw new Error("Usuário não encontrado.");

//         return userExists;
//     }
// }

