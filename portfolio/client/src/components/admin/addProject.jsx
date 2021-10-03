import React, { useEffect, useRef, useState } from 'react';
import IndexAPI from '../../apis/indexAPI';

const CreateC = (props) => {

    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [title, setTitle] = useState("")
    const [thumbnail, setThumbnail] = useState("")
    const [projectTech, setProjectTech] = useState([]);
    const [newProject, setNewProject] = useState("")
    const titleInput = useRef(null);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{

                //Get all skills from DB
                const skills = await IndexAPI.get(`/skills`);
                const skillsArray = [];
                for(let i = 0; i < skills.data.results.length; i++){
                    skillsArray.push(skills.data.results[i].skill)
                }
                // console.log(skillsArray)
                setSkills(skillsArray);

                let projectSet = []
                function importAll(projects) {
                    let images = {};
                    projects.keys().forEach((project) => { 
                        images[project.replace('./', '')] = projects(project); 
                        Object.keys(images).forEach((key) => {
                            projectSet.push(key)
                            setProjects([...new Set(projectSet)]);
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

    const createTechList = async (value, checked) =>{
        try{

            if(projectTech === null){
                if(checked){
                    setProjectTech(value);
                }
            }else{
                if(checked){
                    setProjectTech(projectTech => [...projectTech, value]);
                }  
            }

            if(!checked){
                setProjectTech(projectTech.filter(projectTech => projectTech !== value))
            }

        }catch(err){
            console.log(err);
        }
    }

    const createProject = async (e) =>{
        e.preventDefault()
        try{
 
            const response = await IndexAPI.post("/projects/add-project",{
                title,
                thumbnail,
                projectTech,
            });
            titleInput.current.value = "";

            props.setNewProject(newProject)

        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="grid add-project-modal">
            <div className="grid toDo-modal-grid">
                <label>TITLE</label>
                <input ref={titleInput} onChange={e => setTitle(e.target.value)} type="text" name="title"/>
            </div>
            <div className="grid toDo-modal-grid">
                <label>THUMBNAIL</label>
                <select onChange={e => setProjects(e.target.value)} name="project">
                    {console.log(projects)}
                    <option disabled selected>Select a Project...</option>
                    {projects.map((project, index) => {
                        return(
                            <option key={index}>{project}</option>
                        )
                    })}
                </select>
            </div>
            <div className="grid toDo-modal-grid">
                <label>TECH</label>
                {skills.map((skill, index) => {
                    return(
                        <div key={index} className="grid tech-checkbox-list">
                            <label className="tech-checkbox-label">{skill}</label>
                            <input type="checkbox" name="skill" value={skill} onChange={e => createTechList(e.target.value, e.target.checked)}/>
                        </div>
                    )
                })}
            </div>
            <div>
                <button className="form-button" type="submit" onClick={createProject}>CREATE</button>
            </div>
        </div>
    )
}

export default CreateC;