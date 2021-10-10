const express = require('express');
const router = express.Router();
const db = require("../db/index");

router.get('/admin/portfolio/:project', async (req, res) => {

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

router.get('/project', async (req, res) => {

    try{
        const portfolio = await db.query("SELECT * FROM projects WHERE project=?; SELECT * FROM project_tech WHERE project=?;", [req.body.title, req.body.title], function (err, result, fields) {
        if (err) throw err;
            res.status(200).json({
                status: "success",
                results: result,
                data:{
                    skills: result,
                }
            })
        });
    }catch(err){
        console.log(err);
    }
})


module.exports = router;