var express = require('express');
var router = express.Router();
/*IMPORT THE FUNCTIONS FROM THE CONTROLLER */
const{index,patch,remove,show,store}=require('../controllers/orderController')

router.get('/',index);

router.patch('/:id',patch)

//get one
router.get('/:id',show);


// post order
router.post('/',store);


//delete order
router.delete('/:id',remove)
module.exports=router