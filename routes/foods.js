const express = require("express");
const {FoodModel, validateFood} = require("../model/foodModel")
const router = express.Router();
const {authToken}= require("../auth/authToken")

router.get("/",async(req,res) => {
    try{
        let data = await FoodModel.find({})
        .limit(20);
        res.json(data)
    }
   catch(err){
    console.log(err);
    res.status(500).json(err);

   }
})
module.exports = router;


router.post("/",authToken,async(req,res) =>{
 let validBody = validateFood(req.body);
 if(validBody.error){
    return res.status(400).json(validBody.error.details);
 }
 try{
    let food = new FoodModel(req.body);
    food.user_id = req.tokenData._id;
    await food.save();
    res.status(201).json(food);
 }
 catch(err){
    console.log(err);
    res.status(500).json(err);
 }
 

})

module.exports = router;

router.delete("/:idDel",authToken,async(req, res) => {
    try{
        let idDel = req.params.idDel;
        let data;
        if(req.tokenData.role == "admin"){
        data = await FoodModel.deleteOne({_id:idDel});
        }
        else{
        data = await FoodModel.deleteOne({_id:idDel,user_id:req.tokenData._id});  
        }
        //אם יש הצלחה נקבל n = 1
        res.json(data);
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }

})

module.exports = router;

router.put("/:idEdit", async(req,authToken ,res) =>{

    let validBody = validateFood(req.body);
    if(validBody.error){
      return res.status(400).json(validBody.error.details);
    } 
    try{
        let idEdit = req.params.idEdit;
        let data;
        if(req.tokenData.role == "admin"){
         data = await FoodModel.updateOne({_id:idEdit},req.body);
        }
        else{
            data = await FoodModel.updateOne({_id:idEdit, user_id:req.tokenData._id},req.body);
        }
        //אם יש הצלחה נקבל n = 1
        res.json(data);
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }
})

module.exports = router;

 


