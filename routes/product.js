var express = require('express');
var router = express.Router();
const uploadImage = require('../middleware/UploadImage.middleware')
/*IMPORT THE FUNCTION FROM THE CONTROLLER */
const{index,remove,show,update,patch,search,store}=require('../controllers/productController')
const {validateProduct}=require('../middleware/Joi/validation');
const verifyToken=require('../middleware/validateToken')

const multer = require('multer');

//get all
router.get('/',index);


router.get('/search/:segment',search)

//get one
router.get('/:id',show);

//put
router.put('/:id',validateProduct,update)

// post product
router.post('/',uploadImage.upload.single('thumbnail'),store);

// patch  product
router.patch('/:id',uploadImage.upload.single('thumbnail'),patch)

//delete product
router.delete('/:id',remove)

module.exports = router;