import express, { NextFunction, Request, Response } from "express";
import routes from "./routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import { verifyJWT as auth } from "./middleware";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.frontUrl || "*", // url do front
    credentials: true,
    methods: 'GET, PUT, POST, OPTIONS, DELETE, PATCH',
}));

app.all('/*', (req: Request, res: Response, next: NextFunction) =>{
    const publicRoutes = ['/authentication/login', '/users/cadastro', '/users/forgotPassword'];
    for (let i = 0; i < publicRoutes.length; i +=1) {
        if (req.path === publicRoutes[i]) {
            return next();
        }
    } 
    auth(req, res, next);
} );

app.use('/', routes);


export default app;

app.listen(3003, () => {
    console.log("Server On, Port 3003");
});   