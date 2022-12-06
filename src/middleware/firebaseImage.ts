import admin from "firebase-admin";
// import serviceAccount from "../config/firebaseKey.json";
import { Request, Response, NextFunction } from "express";


const bucketAddress = "traveler-image-ad.appspot.com";
const bucket = admin.storage().bucket();

admin.initializeApp({
    // credential: admin.credential.cert(serviceAccount),
    storageBucket: bucketAddress,
});

export function uploadImage(req: Request): string | null{
    if(!req.file) throw new Error("Arquivo não emviado.");

    let firebaseUrl: string | null = null;
    const image = req.file ;
    const fileName = Date.now() + "." + image.originalname.split(".").pop();
    const file = bucket.file(fileName);
    const stream = file.createWriteStream({
        metadata: {
            contentType: image.mimetype,
        },
    });

    stream.on("error", (error) => {
        console.error(error);
    })

    stream.on("finish", async () => {
        //torar o arquivo publico
        await file.makePublic();

        // obter a url publica
        firebaseUrl = `https://storage.googleapis.com/${bucketAddress}/${fileName}`;

    });

    stream.end(image.buffer);

    return firebaseUrl;

};
