import express from 'express'
const router1 = express.Router();
import multer from 'multer'
import { Cat } from '../models/Cat.js'
import decodeTokenReturnUser from '../middleware/decodeTokenReturnUser.js';
import multerStorageCloudinary from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary';
const { v2: cloudinaryV2 } = cloudinary;

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Directory where files will be saved
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//         cb(null, uniqueSuffix + '-' + file.originalname); // Ensure unique file names
//     },
// });
const storage = multerStorageCloudinary({
    cloudinary: cloudinaryV2, 
    folder: 'cats', 
    allowedFormats: ['jpg', 'jpeg', 'png'],  
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);  
    }
});

const upload = multer({ storage });


router1.get('/', async (req, res) => {
    try {
        const cats = await Cat.find({});
        res.status(200).json({
            count: cats.length,
            data: cats
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message)
    }

})
router1.post('/add',upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const cat = new Cat({
            name: req.body.name,
            description: req.body.description,
            image: req.file.path,   
            email: req.body.email,
        });

        await cat.save();
        res.status(201).json(cat);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

router1.put('/:id', async (req, res) => {
    try {
        if (!req.body.name) res.status(400).send("Please enter cat's name");

        const result = await Cat.findByIdAndUpdate(req.params.id, req.body);
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(404).send({ message: "no cat like tat" })
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message)
    }

})

router1.delete('/:id', async (req, res) => {
    try {
        const result = await Cat.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "cat not found" })
        }
        return res.status(200).json({ message: "deleted meow :(" })
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message)
    }
})

router1.get('/mycats',decodeTokenReturnUser,async(req,res)=>{    
    try {
        const result=await Cat.find({email:req.decodedEmail});
        res.status(200).json({data:result});

    } catch (error) {
        res.status(500).send(error.message)        
    }
})

export default router1;