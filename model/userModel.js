const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const {config} = require("../config/secret")


const userSchema = new mongoose.Schema({

    name:String,
    email:String,
    pass:String,
    role:{
      type:String, default:"user"  
    },
    date_created:{
        type:Date, default:Date.now()
    },
    img_url:String

});
const UserModel = mongoose.model("users",userSchema);
exports.UserModel = UserModel;

exports.getToken = (_id,role) =>{
  let token = jwt.sign({_id,role},config.toketSecret,{expiresIn:"60mins"});
  return token;
}

exports.validuser = (_bodyData) => {
    let joiSchema = Joi.object({
       name:Joi.string().min(2).max(99).required(),
       email:Joi.string().min(2).max(300).required().email(),
       pass:Joi.string().min(3).max(100).required()
       
   
    })
    return joiSchema.validate(_bodyData);

}

exports.validLogin = (_bodyData) => {
    let joiSchema = Joi.object({
       email:Joi.string().min(2).max(300).required().email(),
       pass:Joi.string().min(3).max(100).required()
       
   
    })
    return joiSchema.validate(_bodyData);
}