const {expressjwt:jwt}=require('express-jwt')
require('dotenv').config()

const authJwt=()=>{

    

    const secret="e0a6fe63-ae0d-4f49-9eb6-37fbbbbf89e8";
    return jwt({
        secret,
        algorithms:['HS256']
    })
    .unless({path:[
      //  {url:/(.*)/},
        {url : /^\/images\/.*/},
        {url : "/users/registrer"},
        {url : "/users/login"},
            // {
            //    url: '/products',methods:['GET']
            // }
    ]})
}
module.exports=authJwt