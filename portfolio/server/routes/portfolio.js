const express = require('express');
const router = express.Router();
const db = require("../db/index");

router.get('/portfolio', async (req, res) => {

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

router.post('/skill/add-skill', async (req, res) => {
    try{

        const currentSkills = await db.query("SELECT skill FROM skills");

        let uniqueSkill = true;
        for(let i = 0; i< currentSkills.length; i++){
            if(currentSkills[i] === req.body.skill){
                uniqueSkill = false;
            }
        }

        if(uniqueSkill === true){
            const skill = await db.query(`INSERT INTO skills (skill, level) VALUES (?, ?)`, [req.body.skill, req.body.level]);

            res.status(201).json({
                status: "success",
                results: skill.rows,
                data:{
                    skill: skill.rows,
                }
            })
        }
    }catch(err){
        console.log(err);
    }
})

module.exports = router;