const express = require("express");
const router = express.Router();
const db = require("../db/index");

router.get("/portfolio/:project", async (req, res) => {
  try {
    db.query(
      "SELECT * FROM project_tech WHERE project=?; SELECT * FROM project_images WHERE project=?",
      [req.params.project, req.params.project],
      function (err, result) {
        if (err) throw err;
        res.status(200).json({
          status: "success",
          results: result,
          data: {
            project: result,
          },
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
