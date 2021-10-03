import React, { useEffect, useRef, useState } from 'react';
import SkillC from './addSkill';

const CreateC = (props) => {

    const [skillModal, setSkillModal] = useState("")

    const [title, setTitle] = useState("")
    const [thumbnail, setThumbnail] = useState("")
    const [newProject, setNewProject] = useState("")
    const [newSkill, setNewSkill] = useState("");

    const skillRef = useRef();
    const titleInput = useRef(null);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{

                document.addEventListener("mousedown", (event) => {
                    if(skillRef.current !== null){
                        if(!skillRef.current.contains(event.target)){
                            setSkillModal("modal");
                        }
                    }
                })

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, []);

    const displaySkillModal = () => {
        setSkillModal("modal modal-active");
    }

    const createProject = async (e) =>{
        e.preventDefault()
        try{

            props.setNewProject(newProject)

        }catch(err){
            console.log(err);
        }
    }

    return(
        <div>

            <div className={skillModal}>
                <div ref={skillRef} className="modal-content">
                    <SkillC skillModal={skillModal} setNewSkill={newSkill => setNewSkill(newSkill)}/>
                </div>
            </div>

            <div>
                <button onClick={() => displaySkillModal()}>CREATE</button>
            </div>
            <div className="grid toDo-modal-grid">
                <label>TITLE</label>
                <input className="title" ref={titleInput} onChange={e => setTitle(e.target.value)} type="text" name="title"/>
            </div>
            <div className="grid toDo-modal-grid">
                <label>THUMBNAIL</label>
                <input value={thumbnail} onChange={e => setThumbnail(e.target.value)} type="text" name="thumbnail"/>
            </div>
            <div className="grid toDo-modal-grid">
                <label>TECH</label>
                <div>
                    
                </div>
            </div>
            <div>
                <button className="form-button" type="submit" onClick={createProject}>CREATE</button>
            </div>
        </div>
    )
}

export default CreateC;