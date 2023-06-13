// const {expressjwt:jwthrequire('express-jwt')
const jwt=require('jsonwebtoken')
require('dotenv').config()

const verifyToken=(req, res, next)=> {
    const token = req.headers['authorization'];
    console.log('token',token)
    if (!token) {
    //   return res.status(401).send('Unauthorized');
        console.log("no token has been provided")
    }
    try {
    console.log('here')
      const decoded = jwt.verify(token,'e0a6fe63-ae0d-4f49-9eb6-37fbbbbf89e8');
      console.log('decoded',decoded)
      req.user = decoded;
      console.log('req.user')
      next();
    } catch (err) {
      return console.log('invalid token',err)
    }
  }

module.exports=verifyToken