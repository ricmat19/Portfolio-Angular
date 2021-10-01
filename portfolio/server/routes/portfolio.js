const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {

    try{
        res.status(201).json({
            status: "success",
            results: product.rows.length,
            data:{
                product: product.rows[0]
            }
        })
    }catch(err){
        console.log(err);
    }
})

module.exports = router;