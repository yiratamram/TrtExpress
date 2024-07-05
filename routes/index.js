const express = require("express");
const router = express.Router();

router.get("/",(req,res) => {
    res.json({msg:"express work perfect from index"})
})
module.exports = router;