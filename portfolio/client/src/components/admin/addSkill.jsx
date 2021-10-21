import React, { useEffect, useRef, useState } from "react";
import IndexAPI from "../../apis/indexAPI";

const AddSkillC = (props) => {
  const [icons, setIcons] = useState([]);
  const [category, setCategory] = useState("");
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("");
  const [icon, setIcon] = useState("");
  const [ranking, setRanking] = useState("");
  const [newSkill, setNewSkill] = useState("");

  const skillInput = useRef(null);

  useEffect(() => {
    const fetchData = async (req, res) => {
      try {
        let iconSet = [];
        function importAll(icons) {
          let images = {};
          icons.keys().forEach((index) => {
            images[index.replace("./", "")] = icons(index);
            Object.keys(images).forEach((key) => {
              iconSet.push(key);
              setIcons([...new Set(iconSet)]);
            });
          });
        }
        const skillIcons = importAll(require.context("../../images/skills"));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const addSkill = async (e) => {
    e.preventDefault();
    try {
      const response = await IndexAPI.post("/skill/add-skill", {
        category,
        skill,
        level,
        icon,
        ranking,
      });
      skillInput.current.value = "";

      props.setNewSkill(newSkill);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid skill-modal-div">
      {/* Add Skill */}
      <div className="sub-title">ADD A SKILL</div>
      <div className="grid skill-input">
        <label>SKILL</label>
        <input
          ref={skillInput}
          onChange={(e) => setSkill(e.target.value)}
          type="text"
          name="skill"
        />
      </div>
      <div className="grid skill-input">
        <label>CATEGORY</label>
        <select onChange={(e) => setCategory(e.target.value)} name="category">
          <option disabled selected>
            Select a Category...
          </option>
          <option>MARKUP</option>
          <option>STYLE</option>
          <option>FRONTEND</option>
          <option>BACKEND</option>
          <option>DATABASE</option>
          <option>OTHER</option>
        </select>
      </div>
      <div className="grid skill-input">
        <label>RANKING</label>
        <select onChange={(e) => setRanking(e.target.value)} name="rank">
          <option disabled selected>
            Select a Rank...
          </option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>
      <div className="grid skill-input">
        <label>LEVEL</label>
        <select onChange={(e) => setLevel(e.target.value)} name="level">
          <option disabled selected>
            Select a Level...
          </option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
      <div className="grid skill-input">
        <label>ICON</label>
        <select onChange={(e) => setIcon(e.target.value)} name="icon">
          {console.log(icons)}
          <option disabled selected>
            Select an Icon...
          </option>
          {icons.map((icon, index) => {
            return <option key={index}>{icon}</option>;
          })}
        </select>
      </div>
      <div>
        <button className="form-button" type="submit" onClick={addSkill}>
          ADD
        </button>
      </div>
    </div>
  );
};

export default AddSkillC;
