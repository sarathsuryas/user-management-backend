import express from 'express';
import 'dotenv/config';
import  userRouter from './routes/userRouter';
import adminRouter from './routes/adminRouter'
import { connection } from './config/db';
import morgan from 'morgan';
import path from 'path';
import  cors from 'cors';

const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(morgan('dev'))
const port = process.env.PORT
app.use(cors({origin:'*'}))
// database connection
connection()
// admin router
app.use('/',userRouter)
// user router
app.use('/admin',adminRouter)




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});