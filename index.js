const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const NewCollege = require("./models/college");

mongoose.connect("mongodb://localhost:27017/colleges")
.then(() => {
    console.log("Connected to database succcessfully");
})
.catch((err) => {
    console.log(err);
})

app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


app.get("/",async (req,res) => {
    const college = await NewCollege.find({});
    console.log(college);
    res.render("homePage",{ college });
})

app.listen(3000,(req,res) => {
    console.log("3000 active");
})