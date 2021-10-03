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
const projects = importAll(require.context('../../images/projects'));

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
                    projectArray.push(projects.data.results[i])
                }
                setProjects(projectArray);

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, []);

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
                <div>
                    <button onClick={() => displayCreateModal()}>CREATE</button>
                </div>
                <div className="portfolio-thumbnail-div">
                    <div className="portfolio-item-div">
                        <div className="portfolio-project">
                            <img className="project-thumbnail" src="../../images/arcade-screen-shot.jpg"/>
                            <div className="thumbnail-overlay thumbnail-overlay--blur">
                                <div className="tech-used">
                                    <button>UPDATE</button>
                                    <button>DELETE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="portfolio-item-div">
                        <div className="portfolio-project">
                            <img className="project-thumbnail" src="../../images/ecommerce-store-screen-shot.jpg"/>
                            <div className="thumbnail-overlay thumbnail-overlay--blur">
                                <div className="tech-used">
                                    <button>UPDATE</button>
                                    <button>DELETE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="portfolio-item-div">
                        <div className="portfolio-project">
                            <img className="project-thumbnail" src="../../images/planner-screen-shot.jpg"/>
                            <div className="thumbnail-overlay thumbnail-overlay--blur">
                                <div className="tech-used">
                                    <button>UPDATE</button>
                                    <button>DELETE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterC/>
        </div>
    )
}

export default PortfolioC;