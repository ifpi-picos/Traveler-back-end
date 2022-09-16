import express from 'express';
import routes from './routes/index';

const app = express();
app.use(express.json());
app.use(routes);



export default app;

app.listen(3000, () => {
  console.log('🏃 ‍Running Server');
})