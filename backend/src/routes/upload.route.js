import express from 'express';
import { upload } from '../middleware/multer.middleware.js';
import { authenticaUser } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', authenticaUser, upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded' });
        }
        
        const imageUrl = `/uploads/${req.file.filename}`;
        
        res.status(200).json({ 
            message: 'Image uploaded successfully', 
            imageUrl: imageUrl 
        });
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ message: 'Internal server error during upload', error: error.message });
    }
});

export default router;
