const express = require('express');
const { uploadImage, getImages, getImageById, updateImage, deleteImage, upload } = require('../../../../controllers/account.controller')

const router = express.Router();

router.post('/images/upload', upload.single('image'), uploadImage);
router.get('/images', getImages);
router.get('/images/:id', getImageById);
router.put('/images/:id', updateImage);
router.delete('/images/:id', deleteImage);

module.exports = router;