import React, { useEffect, useRef, useState } from 'react';
import IndexAPI from '../../apis/indexAPI';

const CreateC = (props) => {

    const [projectImages, setProjectImages] = useState([]);
    const [skills, setSkills] = useState([]);

    const [project, setProject] = useState("")
    const [thumbnails, setThumbnails] = useState([])
    const [projectTech, setProjectTech] = useState([]);

    const [createdProject, setCreatedProject] = useState("") //Fix
    
    const projectInput = useRef(null);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{

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
    }, []);

    const createList = async (value, checked, setList, list) =>{
        try{

            if(list === null){
                if(checked){
                    setList(value);
                }
            }else{
                if(checked){
                    setList(list => [...list, value]);
                }  
            }

            if(!checked){
                setList(list.filter(list => list !== value))
            }

        }catch(err){
            console.log(err);
        }
    }

    const createProject = async (e) =>{
        e.preventDefault()
        try{

            console.log(project)
            console.log(thumbnails)
            console.log(projectTech)
 
            const response = await IndexAPI.post("/projects/add-project",{
                project,
                thumbnails,
                projectTech,
            });
            projectInput.current.value = "";

            // props.setCreatedProject(createdProject)

        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="grid add-project-modal">
            <div className="grid toDo-modal-grid">
                <label>TITLE</label>
                <input ref={projectInput} onChange={e => setProject(e.target.value)} type="text" name="project_title"/>
            </div>
            <div className="grid project-creation-checkbox-div">
                <div className="grid thumbnail-checkbox-div">
                    <label>THUMBNAIL</label>
                    <div>
                        {projectImages.map((image, index) => {
                            return(
                                <div key={index} className="grid tech-checkbox-list">
                                    <label className="tech-checkbox-label">{image}</label>
                                    <input type="checkbox" name="image" value={image} onChange={e => createList(e.target.value, e.target.checked, setThumbnails, thumbnails)}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="grid tech-grid">
                    <label>TECH</label>
                    <div>
                        {skills.map((skill, index) => {
                            return(
                                <div key={index} className="grid tech-checkbox-list">
                                    <label className="tech-checkbox-label">{skill}</label>
                                    <input type="checkbox" name="skill" value={skill} onChange={e => createList(e.target.value, e.target.checked, setProjectTech, projectTech)}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div>
                <button className="form-button" type="submit" onClick={createProject}>CREATE</button>
            </div>
        </div>
    )
}

export default CreateC;