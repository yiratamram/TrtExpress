require("dotenv").config();

exports.config ={
    toketSecret:process.env.TOKEN_SECRET,
    userDB:process.env.USER_DB,
    passDB:process.env.PASS_DB
    
}