import admin from "firebase-admin";
import serviceAccount from "../config/firebaseKey.json";
import { Request } from "express";

const bucketAddress = "traveler-image-ad.appspot.com";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: bucketAddress,
});

const bucket = admin.storage().bucket();

export async function uploadImage(req: Request, id: string): Promise<string>{
    if(!req.file) throw new Error("Arquivo não emviado.");

    let firebaseUrl: string = "";
    const image = req.file ;
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

    //tornar o arquivo publico
    await file.makePublic();

    // obter a url publica
    firebaseUrl = `https://storage.googleapis.com/${bucketAddress}/${fileName}`;
    console.log(firebaseUrl)
    stream.end(image.buffer);

    return firebaseUrl;
};
