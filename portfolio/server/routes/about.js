const express = require("express");
const router = express.Router();
const db = require("../db/index");

router.get("/about", async (req, res) => {
  try {
    res.status(201).json({
      status: "success"
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/skill/add-skill", async (req, res) => {
  try {
    const currentSkills = await db.query("SELECT skill FROM skills");

    let uniqueSkill = true;
    for (let i = 0; i < currentSkills.length; i++) {
      if (currentSkills[i] === req.body.skill) {
        uniqueSkill = false;
      }
    }

    let skill = 0;
    if (uniqueSkill === true) {
      if (req.body.level !== "") {
        skill = await db.query(
          `INSERT INTO skills (category, skill, level, icon, ranking) VALUES (?, ?, ?, ?, ?)`,
          [
            req.body.category,
            req.body.skill,
            req.body.level,
            req.body.icon,
            req.body.ranking,
          ]
        );
      } else {
        skill = await db.query(
          `INSERT INTO skills (category, skill, icon, ranking) VALUES (?, ?, ?, ?)`,
          [req.body.category, req.body.skill, req.body.icon, req.body.ranking]
        );
      }

      res.status(201).json({
        status: "success",
        results: skill.rows,
        data: {
          skill: skill.rows,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
});

//Get all skills from the DB
router.get("/skills", async (req, res) => {
  try {
    await db.query(
      "SELECT * FROM skills",
      function (err, result) {
        if (err) throw err;

        res.status(200).json({
          status: "success",
          results: result,
          data: {
            skills: result,
          },
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
