import React, { useEffect, useRef, useState } from 'react';
import {useHistory, useParams} from "react-router-dom";
import IndexAPI from '../apis/indexAPI';
import HeaderC from './header';
import FooterC from './footer';

function importAll(projects) {
    let images = {};
    projects.keys().forEach((index) => { 
        images[index.replace('./', '')] = projects(index); 
    });
    return images
}
const projectThumbnails = importAll(require.context('../images/projects'));

const ProjectDetailsC = () => {

    let history = useHistory();
    let parameters = useParams();

    const [title, setTitle] = useState("");
    const [thumbnails, setThumbnails] = useState([]);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{

                setTitle(parameters.project.toLowerCase())

                //Get project from DB
                const project = await IndexAPI.get(`/portfolio/${parameters.project.toLowerCase()}`);
                console.log("tTESG")

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

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, []);

    return(
        <div className="main">
            <HeaderC/>
            {console.log(thumbnails)}
            <div className="container">
                <div className="title-div">
                    <p className="title">{title}</p>
                </div>
                <div className="grid project-slide-div">
                    {thumbnails[0] !== undefined ? 
                        <img className="grid project-details-image" src={thumbnails[0].default}/>
                    :
                        ""
                    }
                </div>
            </div>

            <FooterC/>
        </div>
    )
}

export default ProjectDetailsC;