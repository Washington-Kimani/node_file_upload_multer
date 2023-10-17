import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import http from 'http';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();
const server = http.Server(app);

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setting view engine
app.set('view engine', 'hbs');

//Multer

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './uploads')
    },
    filename: (rea, file, cb) =>{
        cb(null, uuidv4() + '--' + file.originalname);
    }
})

const upload = multer({ storage: storage });


app.get('/', async (req, res)=>{
    res.render('index');
});

app.post('/single',upload.single('image'), async(req, res)=>{
    res.json({message: `Single file upload successful`, data: req.file});
    return
});


app.post('/multiple', upload.array('images', 3), async (req, res)=>{
    res.json({ message: `Multiple files upload successful`, data: req.files });
    return
})






server.listen(PORT, console.log(`Server is running on port ${PORT}`))