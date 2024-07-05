const express = require("express");
const bcrypt = require("bcrypt")
const {UserModel,validuser,validLogin,getToken} = require("../model/userModel")
const router = express.Router();
const {authToken}= require("../auth/authToken")
const jwt = require("jsonwebtoken");

router.get("/",async(req,res) => {
    let data = await UserModel.find({});
    res.json(data)
})


router.get("/userInfo",authToken,async(req,res) =>{
    //לבדוק אם בכלל נשלח טוקן
        let user = await UserModel.findOne({_id:req.tokenData._id},{pass:0});
        res.json(user);
    
})

router.post("/", async(req,res) =>{
    //req.body
    let validBody = validuser(req.body);
    if(validBody.error){
       return res.status(400).json(validBody.error.details);
    }
    try{
    let user = new UserModel(req.body);
    //TODO:להצפין את הסיסמא
    user.pass = await bcrypt.hash(user.pass, 10);

    await user.save();
    user.pass = "*******"
    res.json(user);
    }
    catch(err){
        console.log(err);
        res.status(400).json({err:"Email alrady in the system or there is enother proplems"});
    }
   })
   
router.post("/login", async(req,res) =>{
    let validBody = validLogin(req.body);
    if(validBody.error){
       return res.status(400).json(validBody.error.details);
    }
    //נבדוק אם המייל שנשלח בבאדי קיים במסד נתונים
    let user = await UserModel.findOne({email:req.body.email});
    if(!user){
        return res.status(401).json({msg:"Usernot found"});
    }
    //נבדוק אם הסיסמא שנשלחה מתאימה לסיסמא שבמסד נתונים
    let passValid = await bcrypt.compare(req.body.pass,user.pass);
    if(!passValid){
        return res.status(401).json({msg:"Password worng"});
    }
    //res.json({msg:"all is good need to send you token"});
    //נחזיר הודעה שהכל בסדר ונחזיר טוקן
    let newToken = getToken(user._id,user.role);
    res.json({token:newToken});
 
})

   module.exports = router;