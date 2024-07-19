//הגדרנו משתמש שיש לו יכולות מיוחדות של האקספרס
const express = require("express");
//יודע לקחת כתובת ולעשות עליה מניפוציה
const path = require("path")
//משתנה שיש לו יכולות להפעיל שרת
const http = require("http");
const {routesInit} = require("./routes/config_route")

const fileUpload = require("express-fileupload");

//יצרנו משתנה שיש לו את היכולת של האקספרס כולל האזנה לראוט
const app = express();

const cors = require("cors");





//הגדרת פירסור מידע כגייסון
app.use(express.json());

app.use(fileUpload({
    limits: { fileSize: 1024 * 1024 * 5}
  }))

app.use(express.static(path.join(__dirname,"public")));

app.use(cors());

routesInit(app);

require("./db/mongoConnect") 

//הגדרנו ראוט של העמוד בית ומה קורה
//req - מה שנקבל מהצד לקוח או מהדפדפן בראוט 
//res - מה השרת מגיב לצד לקוח, במקרה שלנו דפדפן 
app.get("/",(req,res) => {
    //אומר לו להחזיר מידע בפורמט גייסון לצד לקוח
    res.json({msg:"express work perfect"})
})


//מייצרים שרת שמשתמש במשתנה אפ שיש לו את כל היכולות המיוחדות של אקספרס
const server = http.createServer(app);
//הגדרנו פורט 
let port =process.env.PORT || "3002";
// 3000 מאזינים לשרת כפורט 
server.listen(port);