import React, { useRef, useState } from 'react';
import IndexAPI from '../../apis/indexAPI';

const AddSkillC = (props) => {

    const [skills, setSkills] = useState([]);
    const [skill, setSkill] = useState("");
    const [level, setLevel] = useState("")
    const [newSkill, setNewSkill] = useState("")

    const skillInput = useRef(null);

    const addSkill = async (e) =>{
        e.preventDefault()
        try{

            const response = await IndexAPI.post("/skill/add-skill",{
                skill,
                level,
            });
            skillInput.current.value = "";

            props.setNewSkill(newSkill)

        }catch(err){
            console.log(err);
        }
    }

    return(
        <div>
            {/* Create To Do */}
            <div className="grid toDo-modal-grid">
                <label>SKILL</label>
                <input ref={skillInput} onChange={e => setSkill(e.target.value)} type="text" name="skill"/>
            </div>
            <div className="grid toDo-modal-grid">
                <label>LEVEL</label>
                <select onChange={e => setLevel(e.target.value)} name="level">
                    <option disabled>Select a Level...</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </div>
            <div>
                <button className="form-button" type="submit" onClick={addSkill}>CREATE</button>
            </div>
        </div>
    )
}

export default AddSkillC;