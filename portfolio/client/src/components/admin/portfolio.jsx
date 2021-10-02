import React, { useEffect, useRef, useState } from 'react';
import HeaderC from '../header';
import FooterC from '../footer';
import CreateC from './create';

const PortfolioC = () => {

    const [createModal, setCreateModal] = useState("modal");
    const [newProject, setNewProject] = useState("");

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
                <form>
                    <div ref={createRef} className="modal-content">
                        <CreateC createModal={createModal} setNewProject={newProject => setNewProject(newProject)}/>
                    </div>
                </form>
            </div>

            <div className="container">
                <div className="title-div">
                    <p className="title">portfolio</p>
                </div>
                <div>
                    <div className="tech-used">
                        <button onClick={() => displayCreateModal()} className="tech">CREATE</button>
                    </div>
                </div>
                <div className="portfolio-thumbnail-div">
                    <div className="portfolio-item-div">
                        <div className="portfolio-project">
                            <img className="project-thumbnail" src="../../images/arcade-screen-shot.jpg"/>
                            <div className="thumbnail-overlay thumbnail-overlay--blur">
                                <div className="tech-used">
                                    <p className="tech">UPDATE</p>
                                    <p className="tech">DELETE</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="portfolio-item-div">
                        <div className="portfolio-project">
                            <img className="project-thumbnail" src="../../images/ecommerce-store-screen-shot.jpg"/>
                            <div className="thumbnail-overlay thumbnail-overlay--blur">
                                <div className="tech-used">
                                    <p className="tech">UPDATE</p>
                                    <p className="tech">DELETE</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="portfolio-item-div">
                        <div className="portfolio-project">
                            <img className="project-thumbnail" src="../../images/planner-screen-shot.jpg"/>
                            <div className="thumbnail-overlay thumbnail-overlay--blur">
                                <div className="tech-used">
                                    <p className="tech">UPDATE</p>
                                    <p className="tech">DELETE</p>
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