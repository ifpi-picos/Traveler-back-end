import express from 'express';
import routes from './routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: '*',
    credentials: true,
    methods: 'GET, PUT, POST,optionsSuccessStatus, DELETE',
}));

app.use('/', routes);


export default app;

app.listen(3003, () => {
    console.log("Server On, Port 3003");
});   