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
const projectThumbnail = importAll(require.context('../../images/projects'));

const ProjectDetailsC = () => {

    let history = useHistory();
    let parameters = useParams();

    const [title, setTitle] = useState("");
    const [thumbnailArray, setThumbnailArray] = useState("");

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{

                setTitle(parameters.project.toLowerCase())

                //Get project from DB
                const project = await IndexAPI.get(`/admin/portfolio/${parameters.project}`);
                const projectThumbnailArray = [];
                for(let i = 0; i < project.data.results[0].length; i++){
                    project.data.results[0][i].thumbnail = projectThumbnail[project.data.results[0][i].thumbnail]
                    projectThumbnailArray.push(project.data.results[0][i])
                }
                setThumbnailArray(projectThumbnailArray);
                console.log()

                //Get Project skills from DB

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, []);

    return(
        <div className="main">
            <HeaderC/>

            <div className="container">
                <div className="title-div">
                    <p className="title">{title}</p>
                </div>
                <div className="grid project-slide-div">
                    {thumbnailArray[0] !== undefined ? 
                        <img className="grid project-details-image"src={thumbnailArray[0].thumbnail.default}/>
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