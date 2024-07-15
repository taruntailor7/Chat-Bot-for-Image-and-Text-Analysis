const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const imageController = require('../controllers/imageController');

// Define allowed file types
const TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = TYPE[file.mimetype]; // Multipurpose Internet Mail Extensions type
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const isValid = !!TYPE[file.mimetype];
  cb(null, isValid);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // limit file size to 5MB
});

router.post('/analyze', upload.single('image'), imageController.analyzeImageAndText);
router.get('/analyses', imageController.getAllAnalyses);

module.exports = router;