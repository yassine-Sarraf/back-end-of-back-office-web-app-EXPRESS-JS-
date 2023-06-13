var express = require('express');
var router = express.Router();
const{register,index,remove,getOne,patch,login}=require('../controllers/userController')
/* GET users listing. */
router.get('/',index);

//post register user sà ypo can do this without even thinking so that 
router.post('/register',register)

// login  user
router.post('/login',login)

// remove a user
router.delete('/:id',remove)

//get a user by ID
router.get('/:id',getOne)

// patch a user 
router.patch('/:id',patch)


module.exports = router;
