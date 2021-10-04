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
                const projectArray = [];
                for(let i = 0; i < projects.data.results.length; i++){
                    projects.data.results[i].thumbnail = projectThumbnail[projects.data.results[i].thumbnail]
                    projectArray.push(projects.data.results[i])
                }
                setProjects(projectArray);

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
            {console.log(projects)}
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