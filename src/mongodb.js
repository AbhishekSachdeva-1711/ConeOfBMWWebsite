const mongoose = require('mongoose');
try{
const connect = mongoose.connect("mongodb://localhost:27017/login-backend");

    console.log("database connected succesfully");
}
catch(err) {
    console.log("database cannot be connected");
};

const SigninSchema = new mongoose.Schema({
    id:{
        type: Number
    },
    name: {
        type: String,
        require: true
    },
    email:{
        type: String, 
        require: true
    },
    password: {
        type: String,
        require: true
    }
   
});
const ModelSchema = new mongoose.Schema({
    id:{
        type: Number
    },
    model: {
        type: String,
        require: true
    },
    fuel:{
        type: String, 
        require: true
    },
    prize: {
        type: String,
        require: true
    }
   
});


const collection = new mongoose.model("SignIn", SigninSchema);
const Model = mongoose.model("Model", ModelSchema);
module.exports= collection;
