// Middleware for handling auth
const { Admin }=require("../db");
const jwt=require("jsonwebtoken");
async function adminMiddleware(req, res, next) {
    
    // using username and password
    // const user=req.headers.username;
    // const password=req.headers.password;
    // const resp=await Admin.find({
    //     user,
    //     password
    // });

    // use jwt tokens 
    const JWT_SECRET="monish";
    const data=req.headers.authorization;
    const resp=jwt.verify(data,JWT_SECRET);

    if(resp.username){
        next();
    }
    else{
        res.status(400).json({msg: " Invalid Token !"});
    }
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
}

module.exports = adminMiddleware;