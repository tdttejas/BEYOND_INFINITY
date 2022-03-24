const mongoose = require("mongoose");
const newCollege = require("./models/college");


mongoose.connect("mongodb://localhost:27017/college")
.then(() => {
    console.log("Connected to database succcessfully");
})
.catch((err) => {
    console.log(err);
})

const vjti = new newCollege({
    name:"Veermata Jijabai Technological Insitute",
    establishment: "1887",
    universityAffiliation:"Mumbai University",
    facilities:["24X7 wifi","Good management"],
    address:"H R Mahajani Rd, Matunga, Mumbai, Maharashtra 400019",
    courses:[
        {
            courseName:"Information Technology",
            level : "B Tech",
            intake: 60
        },
        {
            courseName:"Computer Engineering",
            level : "B Tech",
            intake: 60
        }
    ],
    url:"https://images.collegedunia.com/public/college_data/images/appImage/28202_1443441209VJTI_New.jpg?mode=stretch"
})
vjti.save()
.then(data => {
    console.log(data);
})
.catch(err => {
    console.log(err);
})