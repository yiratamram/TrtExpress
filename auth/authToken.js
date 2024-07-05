const jwt = require("jsonwebtoken");
const{config} = require("../config/secret")
exports.authToken = (req,res,next) =>{
//לבדוק אם בכלל נשלח טוקן
let token = req.header("x-api-key");
if(!token){
    res.status(401).json({msg:"you must send token (authToken)"});
}
//לבדוק אם התוקן תקין או בתוקף
try{
    let decodeToken = jwt.verify(token,config.toketSecret);
    req.tokenData = decodeToken;
  
    //אם הכל בסדר נעבור לפנוקצייה הבאה
    next();
  }
catch(err){
  console.log(err);
  res.status(401).json({msg:"token invalid or expired (authToken)"});
}
}