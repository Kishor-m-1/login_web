const express =require('express');
const path= require('path');
const collection= require('./config.js')
const bcrypt= require('bcrypt')

const app =express();
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/",(req,res)=>{
    res.render("login");
})
app.get("/signup",(req,res)=>{
    res.render("signup");
})
app.get("/forgot",(req,res)=>{
    res.render("forgot");
})
app.get("/reset",(req,res)=>{
    res.render("reset");
})
app.get("/email",(req,res)=>{
    res.render("email");
})
app.post("/signup",async(req,res)=>{
    const data={
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        dob: req.body.dob,
    }
    const exist = await collection.findOne({name: data.name});
    if(exist){
        res.send("User already exist");
    }else{
        const saltRounds= 10;
        const hashed= await bcrypt.hash(data.password,saltRounds);
        data.password = hashed;
        const userdata =await collection.insertMany(data);
    }
})

app.post("/login",async(req,res)=>{
    const exist = await collection.findOne({name: req.body.name});
    if(!exist){
        res.send("No user found.")
    }else{
    const result =await bcrypt.compare(req.body.password, exist.password );
    if(result){
        res.render('home');
    }
    }
})
app.post("/forgot",(req,res)=>{
    res.render("reset");
})
app.post("/email",(req,res)=>{
    res.render("reset");
})
app.post("/reset",(req,res)=>{
    res.redirect("/");
})

const port=4000;
app.listen(port,(req,res)=>{
    console.log("server running on server 4000");
})