const { User }=require("../db");
const jwt=require("jsonwebtoken");
const JWT_SECRET="monish";

async function userMiddleware(req, res, next) {
    // const username=req.headers.username;
    // const password=req.headers.password;
    // const resp=await User.find({
    //     username,
    //     password
    // });
    const token=req.headers.authorization;
    const response=jwt.verify(token,JWT_SECRET);
    if(response.username){
        next();
    }
    else{
        res.status(400).json({msg: " Invalid token for user"});
    }
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
}

module.exports = userMiddleware;