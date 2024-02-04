const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin }=require("../db");
const { Course }=require("../db");
const jwt=require("jsonwebtoken");
const JWT_SECRET="monish";
// Admin Routes
router.get('/signin',async function(req,res,next){
    const username=req.headers.username;
    const exist=await Admin.findOne({username});
    
    if(exist){
            const token=jwt.sign({username: username},JWT_SECRET);
            res.status(200).json({token: token});
        }
    else{
        res.status(411).json({msg: "User not exist"});
    }

})
router.post('/signup', async (req, res) => {
    console.log("user request");
    // Implement admin signup logic
    const username=req.body.username; 

     // make sure bahi the body section of the postman has json as a data type and "username": "data", you follow this 
    const password=req.body.password;
    try{

        const exist=await Admin.findOne({username});
        if(exist){
            res.status(400).json({msg: "User already exist"});
        } 
        else{
            const resp=await Admin.create({
                username,
                password
            });
            res.json({msg: "Successfully sign up  the Admin and stored in DB"});
        }
       
    }
    catch(error){
            console.log(error);
            res.status(400).json({msg: " Cannot signup Admin Successfully"})
    }
});

router.post('/courses',adminMiddleware,async (req, res) => {
    // Implement course creation logic
    const title=req.body.title;
    const price=req.body.price; // make sure to give number
    const imageLink=req.body.imageLink;

    const resp=await Course.create({
        title,
        price,
        imageLink
    });
    if(resp){
        res.json({msg: "Successfully created the course"});
    }
    else{
        res.status().json({msg: " Cannot create course Admin"});
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const username=req.headers.username;
    try{
        const data=await Course.find({});
        
        if(data){
            res.status(200).json({msg: data });
        }
        else{
            res.json({msg: "No Courses yet"});
        }
    }
    catch(err){
        console.log(err);
    }

});

module.exports = router;