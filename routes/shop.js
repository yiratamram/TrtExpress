const express = require("express");
const {prods_ar} = require("../data/shopdata")
const router = express.Router();


router.get("/",(req,res) => {
 res.json({prods_ar})
})
 router.get("/category",(req,res) =>{
    let categoryQ = req.query.category;
    let temp_ar = prods_ar.filter(item =>{return item.cat ==categoryQ

    })
    res.json(temp_ar)
 })
 //עם משתנים - params

 router.get("/category2/:catName",(req,res) =>{
    let categoryQ = req.params.catName;
    let temp_ar = prods_ar.filter(item =>{return item.cat ==categoryQ

    })
    res.json(temp_ar)
 })

 //  ללא משתנים query דוגמא ל 
 //?min=20

 router.get("/query",(req,res) =>{
    let min = req.query.min;
    let temp_ar = prods_ar.filter(item =>{return Number(item.price)> min

    })
    res.json(temp_ar)
 })

 //  שליפה לפי id

router.get("/single/:id",(req,res) =>{
    let id = req.params.id;
    let prod = prods_ar.find(item =>{return item.id ==id

    })
    res.json(prod)
 })


module.exports = router;