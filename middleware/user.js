const { User }=require("../db");
async function userMiddleware(req, res, next) {
    const username=req.headers.username;
    const password=req.headers.password;
    const resp=await User.find({
        username,
        password
    });
    if(resp){
        next();
    }
    else{
        res.status(400).json({msg: " Username or Password of User is wrong"});
    }
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
}

module.exports = userMiddleware;