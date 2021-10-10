const express = require('express');
const router = express.Router();
const db = require("../db/index");

router.get('/admin/portfolio/:project', async (req, res) => {

    try{
        const portfolio = await db.query("SELECT * FROM project_tech WHERE project=?; SELECT * FROM project_images WHERE project=?", [req.params.project, req.params.project], function (err, result, fields) {
            
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