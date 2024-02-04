// Middleware for handling auth
const { Admin }=require("../db");
async function adminMiddleware(req, res, next) {
    const user=req.headers.username;
    const password=req.headers.password;
    const resp=await Admin.find({
        user,
        password
    });
    if(resp){
        next();
    }
    else{
        res.status(400).json({msg: " Username or Password of Admin is wrong"});
    }
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
}

module.exports = adminMiddleware;