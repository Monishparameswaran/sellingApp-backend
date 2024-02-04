const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:5how8HoKUEKibEUG@cluster0.pydstvs.mongodb.net/sellingapp');

// Define schemas
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
    // Schema definition here
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchaseCourse:[
        {
            type: mongoose.Schema.Types.ObjectId, // thus states all the elements in this array going to
            ref: 'Course'
        }
    ]
    // Schema definition here
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    price: Number,
    imageLink: String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}