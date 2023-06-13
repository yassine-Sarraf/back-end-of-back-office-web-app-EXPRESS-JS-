var express = require('express');
var router = express.Router();

/*IMPORT THE FUNCTION FROM THE CONTROLLER */
const{index,remove,show,update,patch,store}=require('../controllers/categorieController')
const{validateCategorie}=require('../middleware/Joi/validation')

//get all
router.get('/',index);

//get one
router.get('/:id',show);

//put
router.put('/:id',update)

// post categorie
router.post('/',validateCategorie,store);

// patch  categorie
router.patch('/:id',patch)

//delete categorie
router.delete('/:id',remove)

module.exports = router;