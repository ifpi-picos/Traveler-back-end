import express, { NextFunction, request, Request, Response } from 'express';
import routes from './routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import auth from './middleware/verify';

const app = express();
app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//     origin: '*',
//     credentials: true,
//     methods: 'GET, PUT, POST,optionsSuccessStatus, DELETE',
// }));

// app.all('/*', (req: Request, res: Response, next: NextFunction) =>{
//     console.log(req.path)
//     const publicRoutes = ['/authentication', '/', '/users'];
//     for (let i = 0; i < publicRoutes.length; i +=1) {
//         if (req.path === publicRoutes[i]) {
//             return next();
//         }
//     } 
//     auth(req, res, next);
// } )

app.use('/', routes);


export default app;

app.listen(3003, () => {
    console.log("Server On, Port 3003");
});   