import React, { useEffect, useRef, useState } from 'react';
import {useHistory, useParams} from "react-router-dom";
import IndexAPI from '../../apis/indexAPI';
import HeaderC from '../header';
import FooterC from '../footer';

function importAll(projects) {
    let images = {};
    projects.keys().forEach((index) => { 
        images[index.replace('./', '')] = projects(index); 
    });
    return images
}
const projectThumbnails = importAll(require.context('../../images/projects'));

const ProjectDetailsC = () => {

    let history = useHistory();
    let parameters = useParams();

    const [title, setTitle] = useState("");
    const [githubLink, setGithubLink] = useState("");
    const [thumbnails, setThumbnails] = useState([]);
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{

                setTitle(parameters.project.toLowerCase())

                //Fix: Add Github URL to DB
                setGithubLink(`https://github.com/ricmat19/${parameters.project}`)

                //Get project from DB
                const project = await IndexAPI.get(`/portfolio/${parameters.project}`);
                console.log(project)

                const projectThumbnailsArray = [];
                //Loops through the array of images associated with this project
                for(let i = 0; i < project.data.results[1].length; i++){

                    //Gets the file name of the current project image
                    const projectFile = project.data.results[1][i].thumbnail

                    //Loops through the array of imported images
                    for(let j = 0; j < Object.keys(projectThumbnails).length; j++){

                        if(Object.keys(projectThumbnails)[j] === projectFile){
                            projectThumbnailsArray.push(projectThumbnails[projectFile])
                        }
                    }
                }
                setThumbnails(projectThumbnailsArray);

                const projectTechArray = [];
                //Loops through the array of images associated with this project
                for(let i = 0; i < project.data.results[0].length; i++){
                    projectTechArray.push(project.data.results[0][i].technology);
                }
                setTechs(projectTechArray);

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, []);

    return(
        <div className="main">
            <HeaderC/>

            <div className="project-details-container">
                <div className="title-div">
                    <p className="title">{title}</p>
                </div>
                <div className="grid project-details">
                    <div className="grid project-slide-div">
                        {thumbnails[0] !== undefined ?
                            <div className="grid image-container">
                                <img className="grid project-image" src={thumbnails[0].default}/>
                            </div>
                        :
                            ""
                        }
                    </div>
                    <div className="grid project-tech-div">
                        {techs.map((tech, index) => {
                            return(
                                <button className="tech-label">{tech}</button>
                            )
                        })}
                    </div>
                    <div className="text-content-container">
                        <div className="info-container">
                            <div className="sub-title">about the project</div>
                            <div className="info-div">
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo itaque nulla deleniti aperiam animi rerum atque numquam ex quod inventore rem fugit possimus ab quibusdam vel sint, facere totam omnis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam velit omnis ducimus in. Aperiam aut possimus ullam consectetur ipsa cumque nesciunt et, quia laborum accusantium iste magni, non minus quod? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis, molestiae doloribus cupiditate magni sapiente nostrum voluptatem soluta nisi repellat quae voluptatibus accusantium magnam illo facere fugit maxime distinctio quis officia.</p>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo itaque nulla deleniti aperiam animi rerum atque numquam ex quod inventore rem fugit possimus ab quibusdam vel sint, facere totam omnis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam velit omnis ducimus in. Aperiam aut possimus ullam consectetur ipsa cumque nesciunt et, quia laborum accusantium iste magni, non minus quod? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis, molestiae doloribus cupiditate magni sapiente nostrum voluptatem soluta nisi repellat quae voluptatibus accusantium magnam illo facere fugit maxime distinctio quis officia.</p>
                            </div>
                        </div>
                        <div className="resource-container">
                            <div className="sub-title">Resources</div>
                            <div className="resources-div">
                                <ul>
                                    <li>
                                        <span className="project-resource">
                                            <a target="_blank" href={githubLink}>Github</a>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FooterC/>
        </div>
    )
}

export default ProjectDetailsC;