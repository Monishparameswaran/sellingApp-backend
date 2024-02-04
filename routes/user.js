const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User }=require("../db");
const { Course }=require("../db");
// User Routes
router.post('/signup', async (req, res) => {
    console.log("User trying to signup");
    // Implement user signup logic
    const username=req.body.username;
    const password=req.body.password;

    try{
        const response=await User.create({
            username,
            password
        });
        if(response){
            res.status(200).json({msg: "Welcome  "+username+" Signed up"});
        }
        else{
            res.status(400).json({msg: "Cannot store data somethig wrong"});
        }
    }
    catch(err){
         console.log(err);
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    // they wanted to see all the coursses irrespective of their login
    try{
        const course=await Course.find({});
        if(course){
            res.status(200).json({courses: course });
        }
        else{
            res.status(400).json({msg: "Oops something went wrong"});
        }
    }
    catch(err){
        console.log(err);
    }

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic

    console.log("User trying to purchase course");
    const username=req.headers.username;
    const id=req.params.courseId;
    try{
        await User.updateOne({
            username: username
        }, {
            "$push": {
                purchaseCourse: id
            }
        })
        res.json({
            message: "Purchase complete!"
        })
    }
    catch(err){
        console.log(err);
    }

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const name=req.headers.username;
    const user=await User.findOne({
        username: name
    });
    if(user){
        const course=await Course.find({
            _id:{
                "$in": user.purchaseCourse
            }
        });
            
        res.status(200).json({Allcourse: course});
    }

    
});

module.exports = router