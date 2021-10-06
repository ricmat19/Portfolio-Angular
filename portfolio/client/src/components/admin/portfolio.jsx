import React, { useEffect, useRef, useState } from 'react';
import IndexAPI from '../../apis/indexAPI';
import HeaderC from '../header';
import FooterC from '../footer';
import CreateC from './addProject';

function importAll(projects) {
    let images = {};
    projects.keys().forEach((index) => { 
        images[index.replace('./', '')] = projects(index); 
    });
    return images
}
const projectThumbnail = importAll(require.context('../../images/projects'));

const PortfolioC = () => {

    const [createModal, setCreateModal] = useState("modal");
    const [newProject, setNewProject] = useState("");

    const [projects, setProjects] = useState([]);
    const [technology, setTechnology] = useState([]);

    const createRef = useRef();

    const displayCreateModal = () => {
        setCreateModal("modal modal-active");
    }

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{

                document.addEventListener("mousedown", (event) => {
                    if(createRef.current !== null){
                        if(!createRef.current.contains(event.target)){
                            setCreateModal("modal");
                        }
                    }
                })


                //Get all skills from DB
                const projects = await IndexAPI.get(`/projects`);
                const projectThumbnailArray = [];
                for(let i = 0; i < projects.data.results[0].length; i++){
                    projects.data.results[0][i].thumbnail = projectThumbnail[projects.data.results[0][i].thumbnail]
                    projectThumbnailArray.push(projects.data.results[0][i])
                }
                setProjects(projectThumbnailArray);

                console.log(projects.data.results[1])
                const projectsArray = [];
                const projectTechArray = [];
                const numberofProjects = 0;
                const projectName = "";
                for(let i = 0; i < projects.data.results[1].length; i++){
                    if(projectsArray.indexOf(projects.data.results[1][i].project) === -1){
                        projectsArray.push(projects.data.results[1][i].project);
                    }
                }
                for(let i = 0; i < projectsArray.length; i++){
                    for(let j = 0; j < projects.data.results[1].length; j++){
                        if(projects.data.results[1][j].project === projectsArray[i]){
                            // projectsArray[i].tech = projects.data.results[1][j].technology
                        }
                    }
                }

                // setTechnology(projectArray);
                console.log(projectsArray)

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, []);

    const updateProject = async (id) => {
        try{

        }catch(err){
            console.log(err);
        }
    }

    const deleteProject = async (id) => {
        try{

        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="main">
            <HeaderC/>
            <div className={createModal}>
                <div ref={createRef} className="modal-content">
                    <CreateC createModal={createModal} setNewProject={newProject => setNewProject(newProject)}/>
                </div>
            </div>

            <div className="container">
                <div className="title-div">
                    <p className="title">portfolio</p>
                </div>
                <div className="create-project-div">
                    <button onClick={() => displayCreateModal()}>CREATE</button>
                </div>
                    <div className="portfolio-thumbnail-div" >
                        {projects.map((project, index) => {
                            return(
                                <div className="portfolio-item-div" key={index}>
                                    <div className="portfolio-project">
                                        <img className="project-thumbnail" src={project.thumbnail.default}/>
                                        <div className="thumbnail-overlay thumbnail-overlay--blur">
                                        {technology.map((tech, index) => {
                                            return(
                                                <div>

                                                </div>
                                            )
                                        })}
                                            <div className="tech-used">
                                                <button onClick={() => updateProject()}>UPDATE</button>
                                                <button onClick={() => deleteProject()}>DELETE</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
            </div>
            <FooterC/>
        </div>
    )
}

export default PortfolioC;