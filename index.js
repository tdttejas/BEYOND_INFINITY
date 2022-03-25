const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const College = require("./models/college");
const ExpressError =require( "./utilities/ExpressError.js");
const dotenv= require("dotenv")
dotenv.config();

const dbUrl=process.env.DB_URL;
//"mongodb://localhost:27017/college"
mongoose.connect(dbUrl)
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

app.use(express.static(path.join(__dirname,"public")));

app.get("/",async (req,res) => {
    const allColleges   = await College.find({});
    console.log(allColleges);
    res.render("index", { allColleges } );
})
app.get("/geotag",(req,res)=>{
    res.redirect("https://harsh-7578.github.io/Final_SIH/")
})
app.get("/:college_name",async(req,res,next)=>{
    try{
    const { college_name } = req.params;
    console.log(college_name);
    const college = await College.findOne({ name: college_name });
    console.log(college);
    res.render("tourpage",{ college });
    }catch(err){
        next(err);
    }

})

app.all('*',(req, res, next) => {
    throw new ExpressError("How did you get here ?", 404)
})

app.use((err, req, res, next) => {
    
    const { statusCode = 500 } = err;
    console.log(statusCode);
    res.status(statusCode).render("error", { err,statusCode })
})

app.listen(3000,(req,res) => {
    console.log("3000 active");
})