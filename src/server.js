const express = require('express');
const path = require("path");
const bcrypt = require('bcrypt');
const app = express();
const collection = require('../src/mongodb');



app.use(express.json()); 
app.use(express.urlencoded({extended: false}));

app.set('views', 'D:\\ABHISHEK\\BMW\\views');
app.set('view engine','ejs');
app.use(express.static(`public`));

app.get("/", (req,res)=>{
    res.render("signin")
})
app.get("/signin",(req,res)=>{
    res.render("signin")
})

app.get("/register",(req,res)=>{
    res.render("register")
})

app.get("/index",(req,res) => {
    res.render("index")
})
app.get("/models", (req,res) =>{
    res.render("models")
})
app.post("/register",async (req, res) =>{
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    const existingEmail = await collection.findOne({email: data.email});

    if(existingEmail) {
        res.send("Email already exists");
    }
    else{
        // const hashedPassword = await bcrypt.hash(data.password, 10);
        // console.log("Hashed Password: ", hashedPassword);
        // const user = ({
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: hashedPassword
        // });
        // console.log(`User created ${user}`);
        // if(user){
        //     res.status(201).json({_id: user.id, email: user.email });
        // }else{
        //     res.status(400);
        //     throw new Error("user data is not valid");
        // }
        const userdata = await collection.insertMany(data)
        console.log(userdata);
        res.send("data added");
    }
});
app.post("/signin",async (req,res) =>{

    try{
    const check =  await collection.findOne( {email:req.body.email});
        if(!check) {
            res.send("user email connot found");
        }

    const isPasswordMatch = await collection({password: req.body.password}, check.password);
        if(req.body.password == check.password){
            res.render("/index");
        }else{
            res.send("wrong Password");
        }
    }catch{
        res.send("wrong Details");
    }
});
app.post("/models" ,async (req, res) =>{
    const carmodel = {
        model: req.body.model,
        fuel: req.body.fuel,
        prize: req.body.prize
    }
    //model
    const existingmodel = await collection.findOne({model: req.body.model});
    if(existingmode){
        res.send("Model already exists");
    }
    else{
        const usermodel = await collection.insertMany(carmodel)
        console.log(usermodel);
        res.send("data added");
    }
    //fule
});






app.listen(3000,()=>{
    console.log("port connected-3000");
})
