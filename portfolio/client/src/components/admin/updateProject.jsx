import React, { useEffect, useRef, useState } from 'react';
import IndexAPI from '../../apis/indexAPI';

const UpdateC = (props) => {

    const [projectImages, setProjectImages] = useState([]);//All Project Image urls
    const [skills, setSkills] = useState([]); //All Skills

    const [title, setTitle] = useState("") //Current Project Name (set initial value though prop)
    const [thumbnail, setThumbnail] = useState("") //Current thumbnail URL (set initial value though prop)
    const [projectTech, setProjectTech] = useState([]); //Current project tech (set initial value though prop)
    const [oldTitle, setOldTitle] = useState("");

    const [updatedProject, setUpdatedProject] = useState("") //Fix

    const projectInput = useRef(null);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                setTitle(props.title)
                if(props.tech === []){
                    setProjectTech([])
                }else{
                    setProjectTech(props.tech[0])
                }

                setOldTitle(props.title)

                //Get all skills from DB
                const skills = await IndexAPI.get(`/skills`);
                const skillsArray = [];
                for(let i = 0; i < skills.data.results.length; i++){
                    skillsArray.push(skills.data.results[i].skill)
                }
                setSkills(skillsArray);

                let projectSet = []
                function importAll(projects) {
                    let images = {};
                    projects.keys().forEach((index) => { 
                        images[index.replace('./', '')] = projects(index); 
                        Object.keys(images).forEach((key) => {
                            projectSet.push(key)
                            setProjectImages([...new Set(projectSet)]);
                        })
                    });
                }
                const projectsThumbnails = importAll(require.context('../../images/projects'));

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, [props]);

    const createTechList = async (value, checked) =>{
        try{
            const currentValues = [];
            if(projectTech === null || projectTech === undefined){
                if(checked){
                    currentValues.push(value);
                }
            }else{
                currentValues.push(...projectTech, value)
            }
            setProjectTech(currentValues)

            if(!checked){
                setProjectTech(projectTech.filter(projectTech => projectTech !== value))
            }

        }catch(err){
            console.log(err);
        }
    }

    const updateProject = async (e) =>{
        e.preventDefault();
        try{

            const response = await IndexAPI.put("/projects/update-project",{
                title,
                thumbnail,
                projectTech,
                oldTitle,
            });

            projectInput.current.value = "";

            props.setUpdatedProject(updatedProject)

        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="grid add-project-modal">
            <div className="grid toDo-modal-grid">
                <label>TITLE</label>
                <input ref={projectInput} onChange={e => setTitle(e.target.value)} type="text" name="project_title" value={title}/>
            </div>
            <div className="grid toDo-modal-grid">
                <label>THUMBNAIL</label>
                <select onChange={e => setThumbnail(e.target.value)} name="projectThumbnail">
                    <option disabled selected>Select a Project...</option>
                    {projectImages.map((image, index) => {
                        return(
                            <option key={index} value={image}>{image}</option>
                        )
                    })} 
                </select>
            </div>
            <div className="grid toDo-modal-grid">
                <label>TECH</label>
                {skills.map((skill, index) => {
                    if(projectTech !== undefined){
                        if(projectTech.includes(skill)){
                            return(
                                <div key={index} className="grid tech-checkbox-list">
                                    <label className="tech-checkbox-label">{skill}</label>
                                    <input type="checkbox" name="skill" value={skill} onChange={e => createTechList(e.target.value, e.target.checked)} checked/>
                                </div>
                            )
                        }else{
                            return(
                                <div key={index} className="grid tech-checkbox-list">
                                    <label className="tech-checkbox-label">{skill}</label>
                                    <input type="checkbox" name="skill" value={skill} onChange={e => createTechList(e.target.value, e.target.checked)}/>
                                </div>
                            )
                        }
                    }else{
                        return(
                            <div key={index} className="grid tech-checkbox-list">
                                <label className="tech-checkbox-label">{skill}</label>
                                <input type="checkbox" name="skill" value={skill} onChange={e => createTechList(e.target.value, e.target.checked)}/>
                            </div>
                        )
                    }
                })}
            </div>
            <div>
                <button className="form-button" type="submit" onClick={updateProject}>UPDATE</button>
            </div>
        </div>
    )
}

export default UpdateC;