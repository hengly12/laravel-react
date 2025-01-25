const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5000;

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Directory to store uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Add timestamp to the filename
    }
});

const upload = multer({ storage: storage });

// Create upload route for images
app.post('/api/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    // Respond with the file URL (e.g., '/uploads/filename.jpg')
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// Example product creation route (optional)
app.post('/api/product', (req, res) => {
    const { name, description, price, stock, category_id, status, image } = req.body;
    // In a real scenario, you would save the product data in a database
    res.json({ message: 'Product created successfully', product: { name, description, price, stock, category_id, status, image } });
});

// Serve static files (images) from the "uploads" directory
app.use('/uploads', express.static('uploads'));

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
