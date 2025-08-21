import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';
import resumeRouter from './routes/resumeRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();

const PORT = 4000 ;

//connecting db
connectDB()



app.use(cors());


app.use(express.json());


//routes
app.use('/api/auth',userRouter);
app.use('/api/resume',resumeRouter);


//uploads
app.use(
    '/uploads',
    express.static(path.join(__dirname,'uploads'),{
        setHeaders:(res,_path)=>{
            res.set('Access-Control-Allow-Origin','http://resume-builder-beta-blush.vercel.app')
        }
    })
)

app.get('/',(req,res)=>{
    res.send("app working");
})

app.listen(PORT,()=>{
    console.log(`app listeng at http://localhost:${PORT}`);
})
