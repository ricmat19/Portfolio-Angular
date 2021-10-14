const express = require('express');
const router = express.Router();
const db = require("../db/index");

router.get('/projects', async (req, res) => {

    try{
        const portfolio = await db.query("SELECT * FROM project_images; SELECT * FROM project_tech;", function (err, result, fields) {
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

router.post('/projects/add-project', async (req, res) => {
    try{

        const currentProjects = await db.query("SELECT project FROM projects");

        let uniqueProject = true;
        for(let i = 0; i< currentProjects.length; i++){
            if(currentProjects[i] === req.body.project){
                uniqueProject = false;
            }
        }

        let newProject = "";
        let newTech = "";
        let newThumbnail = "";
        if(uniqueProject === true){

            newProject = await db.query(`INSERT INTO projects (project) VALUES (?)`, [req.body.project]);

            for(let i = 0; i < req.body.thumbnails.length; i++){
                newTech = await db.query(`INSERT INTO project_images (project, thumbnail) VALUES (?, ?)`, [req.body.project, req.body.thumbnails[i]]);
            }

            for(let i = 0; i < req.body.projectTech.length; i++){
                newThumbnail = await db.query(`INSERT INTO project_tech (project, technology) VALUES (?, ?)`, [req.body.project, req.body.projectTech[i]]);
            }

            res.status(201).json({
                status: "success",
            })
        }

    }catch(err){
        console.log(err);
    }
})

router.put('/projects/update-project', async (req, res) => {
    try{

        let project = "";
        project = await db.query(`UPDATE projects SET project=? WHERE project=?`, [req.body.title, req.body.projectFiles, req.body.oldTitle]);

        const deleteImages = await db.query(`DELETE FROM project_images WHERE project=?`, [req.body.title]);
        let newImages = "";
        for(let i = 0; i < req.body.projectFiles.length; i++){
            newImages = await db.query(`INSERT INTO project_images (project, thumbnail) VALUES (?, ?)`, [req.body.title, req.body.projectFiles[i]]);
        }

        const deleteTech = await db.query(`DELETE FROM project_tech WHERE project=?`, [req.body.title]);
        let newTech = "";
        for(let i = 0; i < req.body.projectSkills.length; i++){
            newTech = await db.query(`INSERT INTO project_tech (project, technology) VALUES (?, ?)`, [req.body.title, req.body.projectSkills[i]]);
        }

        res.status(201).json({
            status: "success",
        })

    }catch(err){
        console.log(err);
    }
})

//Delete a collection item
router.delete('/admin/portfolio/:title/delete', async(req, res) => {
    try{
        const deleteProject = await db.query("DELETE FROM projects WHERE project=?", [req.params.title]);
        res.status(204).json({
            status: "success"
        })
    }catch(err){
        console.log(err);
    }
})

module.exports = router;