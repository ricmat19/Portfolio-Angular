import React, { useEffect, useRef, useState } from 'react';
import {useHistory} from "react-router-dom";
import IndexAPI from '../../apis/indexAPI';
import HeaderC from '../header';
import FooterC from '../footer';
import CreateC from './addProject';
import UpdateC from './updateProject';
import DeleteC from './deleteProject';

function importAll(projects) {
    let images = {};
    projects.keys().forEach((index) => { 
        images[index.replace('./', '')] = projects(index); 
    });
    return images
}
const projectThumbnail = importAll(require.context('../../images/projects'));

const PortfolioC = () => {

    let history = useHistory();

    const [createModal, setCreateModal] = useState("modal");
    const [updateModal, setUpdateModal] = useState("modal");
    const [deleteModal, setDeleteModal] = useState("modal");
    const [newProject, setNewProject] = useState("");
    const [updatedProject, setUpdatedProject] = useState("");
    const [deletedProject, setDeletedProject] = useState("");

    const [projects, setProjects] = useState([]);
    const [technology, setTechnology] = useState([]);

    const [currentTitle, setCurrentTitle] = useState("");
    const [currentTech, setCurrentTech] = useState([]);

    const createRef = useRef();
    const updateRef = useRef();
    const deleteRef = useRef();

    const displayCreateModal = () => {
        setCreateModal("modal modal-active");
    }

    const displayUpdateModal = (currentTitle) => {
        try{
            for(let i=0; i < technology.length; i++){
                if(technology[i][currentTitle] !== undefined){
                    setCurrentTech(technology[i][currentTitle])
                    break;
                }else{
                    setCurrentTech([]);
                }
            }

            setCurrentTitle(currentTitle);

            setUpdateModal("modal modal-active");
        }catch(err){
            console.log(err);
        }
    }

    const displayDeleteModal = async (project) => {
        try{
            setDeletedProject(project);
            setDeleteModal("modal modal-active");

        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{

                document.addEventListener("mousedown", (event) => {
                    if(createRef.current !== null && updateRef.current !== null && deleteRef !== null){
                        if(!createRef.current.contains(event.target)){
                            setCreateModal("modal");
                        }
                        if(!updateRef.current.contains(event.target)){
                            setUpdateModal("modal");
                        }
                        if(!deleteRef.current.contains(event.target)){
                            setDeleteModal("modal");
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

                //Array of projects in project_tech
                const projectsArray = [];

                //Adds all the projects in the projectsArray
                for(let i = 0; i < projects.data.results[1].length; i++){
                    if(projectsArray.indexOf(projects.data.results[1][i].project) === -1){
                        projectsArray.push(projects.data.results[1][i].project);
                    }
                }

                const projectTechArray = [];
                //Loops through the projectArray
                for(let i = 0; i < projectsArray.length; i++){
                    const tempArray = [];
                    //Loops through all data provided from project_tech
                    for(let j = 0; j < projects.data.results[1].length; j++){
                        //Checks if the current item in project_tech pertains to the current project
                        if(projects.data.results[1][j].project === projectsArray[i]){
                            tempArray.push(projects.data.results[1][j].technology)
                        }
                    }
                    const key = projectsArray[i];
                    const tempObject = {};
                    tempObject[key] = [tempArray];
                    projectTechArray.push(tempObject)
                }

                setTechnology(projectTechArray);

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, []);

    const filterProjects = async (tech) => {
        try{
                //Get all skills from DB
                const projects = await IndexAPI.get(`/projects`);

                const techProjects = []
                //Get projects that have the specified project_tech
                for(let i = 0; i < projects.data.results[1].length; i++){
                    if(projects.data.results[1][i].technology === tech){
                        techProjects.push(projects.data.results[1][i].project)
                    }
                }

                const projectThumbnailArray = [];
                for(let i = 0; i < projects.data.results[0].length; i++){
                    if(techProjects.includes(projects.data.results[0][i].project)){
                        projects.data.results[0][i].thumbnail = projectThumbnail[projects.data.results[0][i].thumbnail]
                        projectThumbnailArray.push(projects.data.results[0][i])
                    }
                }
                setProjects(projectThumbnailArray);

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

            <div className={updateModal}>
                <div ref={updateRef} className="modal-content">
                    <UpdateC updateModal={updateModal} setUpdatedProject={updateProject => setUpdatedProject(updateProject)} title={currentTitle} tech={currentTech}/>
                </div>
            </div>

            <div className={deleteModal}>
                <div ref={deleteRef} className="modal-content">
                    <DeleteC deleteModal={deleteModal} setDeletedProject={deleteProject => setDeletedProject(deletedProject)} title={deletedProject}/>
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
                                <div className="portfolio-item-div" key={index} onClick={() => history.push(`/admin/portfolio/${project.project}`, { title: project.project })}>
                                    <div className="portfolio-project">
                                        <img className="project-thumbnail" src={project.thumbnail.default}/>
                                        <div className="thumbnail-overlay thumbnail-overlay--blur">
                                            <div className="grid buttons-div">
                                                <div className="tech-used">
                                                    {technology.map((tech, index) => {
                                                        if(tech[project.project] !== undefined){
                                                            return(
                                                                <div className="grid project-tech" key={index}>
                                                                    {tech[project.project][0].map((t, index) => {
                                                                        return(
                                                                            <button key={index} onClick={() => filterProjects(t)}>
                                                                                {t}
                                                                            </button>
                                                                        )
                                                                    })}
                                                                </div>
                                                            )
                                                        }
                                                    })}
                                                </div>
                                                <div className="project-buttons">
                                                    <button onClick={() => displayUpdateModal(project.project)}>UPDATE</button>
                                                    <button onClick={() => displayDeleteModal(project.project)}>DELETE</button>
                                                </div>
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