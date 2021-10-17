import React, { useEffect, useRef, useState } from 'react';
import IndexAPI from '../../apis/indexAPI';

const UpdateC = (props) => {

    // console.log(props)

    const [files, setFiles] = useState([])
    const [projectImages, setProjectImages] = useState([])
    const [projectFiles, setProjectFiles] = useState([]);//All Project Image urls
    const [skills, setSkills] = useState([]); //All Skills
    const [projectSkills, setProjectSkills] = useState([]);

    const [titles, setTitles] = useState([]);
    const [title, setTitle] = useState("") //Current Project Name (set initial value though prop)
    const [thumbnails, setThumbnails] = useState([]) //Current thumbnail URL (set initial value though prop)
    const [tech, setTech] = useState([]); //Current project tech (set initial value though prop)
    const [oldTitle, setOldTitle] = useState("");

    const [updatedProject, setUpdatedProject] = useState("") //Fix

    const projectInput = useRef(null);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                setTitle(props.title)
                setOldTitle(props.title)

                const titlesArray = [];
                for(let i = 0; i < props.thumbnails.length; i++){
                    titlesArray.push(Object.keys(props.thumbnails[i])[0]);
                }
                setTitles(titlesArray)

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

                //Sets the full list of files
                const filesArray = [];
                for(let i = 0; i < props.thumbnails.length; i++){
                    filesArray.push(props.thumbnails[i][titles[i]][0][0]['file'])
                }
                setFiles(filesArray)

                //Sets list of all of the files pertaining to this project
                const projectFilesArray = [];
                for(let i = 0; i < props.thumbnails.length; i++){

                    if(Object.keys(props.thumbnails[i]).toString() === props.title){
                        for(let j = 0; j < props.thumbnails[i][props.title][0].length; j++){
                            projectFilesArray.push(props.thumbnails[i][props.title][0][j]['file'])
                        }
                    }
                }
                setProjectFiles(projectFilesArray)

                //Get all skills from DB
                const skills = await IndexAPI.get(`/skills`);
                const skillsArray = [];
                for(let i = 0; i < skills.data.results.length; i++){
                    skillsArray.push(skills.data.results[i].skill)
                }
                setSkills(skillsArray);

                //Sets list of all of the files pertaining to this project
                const projectTechArray = [];
                for(let i = 0; i < props.tech.length; i++){
                    if(Object.keys(props.tech[i]).toString() === props.title){
                        for(let j = 0; j < props.tech[i][props.title][0].length; j++){
                            projectTechArray.push(props.tech[i][props.title][0][j])
                        }
                    }
                }
                setProjectSkills(projectTechArray)

                if(props.thumbnails === []){
                    setThumbnails([])
                }else{
                    setThumbnails(props.thumbnails[0])
                }

                if(props.tech === []){
                    setTech([])
                }else{
                    setTech(props.tech[0])
                }

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, [props]);

    const createList = async (value, checked, setList, list) =>{
        try{

            console.log(value)
            console.log(list)

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

    const updateProject = async (e) =>{
        e.preventDefault();
        try{

            const response = await IndexAPI.put("/projects/update-project",{
                title,
                projectFiles,
                projectSkills,
                oldTitle,
            });

            projectInput.current.value = "";

            // props.setUpdatedProject(updatedProject)

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
            <div className="grid project-creation-checkbox-div">
                <div className="grid thumbnail-checkbox-div">
                    <label>THUMBNAIL</label>
                    <div>
                        {projectImages.map((file, index) => {
                            // if(projectFiles !== undefined){
                                if(projectFiles.includes(file)){
                                    return(
                                        <div key={index} className="grid tech-checkbox-list">
                                            <label className="tech-checkbox-label">{file}</label>
                                            <input type="checkbox" name="image" value={file} onChange={e => createList(e.target.value, e.target.checked, setProjectFiles, projectFiles)} checked/>
                                        </div>
                                    )
                                }else{
                                    return(
                                        <div key={index} className="grid tech-checkbox-list">
                                            <label className="tech-checkbox-label">{file}</label>
                                            <input type="checkbox" name="image" value={file} onChange={e => createList(e.target.value, e.target.checked, setProjectFiles, projectFiles)}/>
                                        </div>
                                    )
                                }
                            // }else{
                            //     return(
                            //         <div key={index} className="grid tech-checkbox-list">
                            //             <label className="tech-checkbox-label">{file}</label>
                            //             <input type="checkbox" name="image" value={file} onChange={e => createList(e.target.value, e.target.checked, setThumbnails, thumbnails)}/>
                            //         </div>
                            //     )
                            // }
                        })}
                    </div>
                </div>
                <div className="grid tech-grid">
                    <label>TECH</label>
                    <div>
                        {skills.map((skill, index) => {
                            // if(projectSkills !== undefined){
                                if(projectSkills.includes(skill)){
                                    return(
                                        <div key={index} className="grid tech-checkbox-list">
                                            <label className="tech-checkbox-label">{skill}</label>
                                            <input type="checkbox" name="skill" value={skill} onChange={e => createList(e.target.value, e.target.checked, setProjectSkills, projectSkills)} checked/>
                                        </div>
                                    )
                                }else{
                                    return(
                                        <div key={index} className="grid tech-checkbox-list">
                                            <label className="tech-checkbox-label">{skill}</label>
                                            <input type="checkbox" name="skill" value={skill} onChange={e => createList(e.target.value, e.target.checked, setProjectSkills, projectSkills)}/>
                                        </div>
                                    )
                                }
                            // }else{
                            //     return(
                            //         <div key={index} className="grid tech-checkbox-list">
                            //             <label className="tech-checkbox-label">{skill}</label>
                            //             <input type="checkbox" name="skill" value={skill} onChange={e => createList(e.target.value, e.target.checked, setTech, tech)}/>
                            //         </div>
                            //     )
                            // }
                        })}
                    </div>
                </div>
            </div>
                <div>
                    <button className="form-button" type="submit" onClick={updateProject}>UPDATE</button>
                </div>
        </div>
    )
}

export default UpdateC;