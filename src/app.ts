import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './routes';
import exceptionHandler from './middlewares/ExceptionHandler';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(exceptionHandler);

const { SERVER_PORT = 8080 } = process.env;

app.listen(SERVER_PORT, () => { console.log(`Server is running on port ${SERVER_PORT}`) });

export default app;
